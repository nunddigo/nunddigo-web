export const ACCESS_COOKIE = 'nd_ebook';
const ACCESS_DAYS = 30;
async function ensureAccessTable(env) {
  await env.EBOOK_LEADS.prepare('CREATE TABLE IF NOT EXISTS ebook_access (token TEXT PRIMARY KEY, email TEXT NOT NULL, created_at TEXT NOT NULL, expires_at TEXT NOT NULL)').run();
}
// True when the request carries a valid, unexpired pass issued at signup.
export async function hasEbookAccess(request, env) {
  const cookie = request.headers.get('Cookie') || '';
  const token = cookie.split(/;\s*/).find(c => c.startsWith(ACCESS_COOKIE + '='))?.slice(ACCESS_COOKIE.length + 1);
  if (!token || !/^[0-9a-f-]{60,80}$/i.test(token) || !env.EBOOK_LEADS) return false;
  try {
    await ensureAccessTable(env);
    const row = await env.EBOOK_LEADS.prepare('SELECT expires_at FROM ebook_access WHERE token = ?').bind(token).first();
    return !!row && Date.parse(row.expires_at) > Date.now();
  } catch { return false; }
}
export async function signup(request, env) {
  const reply = (body, status = 200) => Response.json(body, {status, headers: {'Cache-Control':'no-store'}});
  if (request.method !== 'POST') return reply({error:'허용되지 않은 요청입니다.'},405);
  const url = new URL(request.url);
  if (request.headers.get('Origin') !== url.origin) return reply({error:'신청 페이지에서 다시 시도해주세요.'},403);
  if (!request.headers.get('Content-Type')?.includes('application/json')) return reply({error:'잘못된 요청입니다.'},415);
  if (Number(request.headers.get('Content-Length')) > 2048) return reply({error:'요청이 너무 큽니다.'},413);
  let data;
  try { const raw = await request.text(); if (raw.length > 2048) return reply({error:'요청이 너무 큽니다.'},413); data = JSON.parse(raw); } catch { return reply({error:'입력 내용을 확인해주세요.'},400); }
  const email = typeof data?.email === 'string' ? data.email.trim().toLowerCase() : '';
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || data.consent !== true || data.website) return reply({error:'이메일 주소와 필수 동의를 확인해주세요.'},400);
  if (!env.EBOOK_LEADS) return reply({error:'신청 연결을 점검 중입니다. 잠시 후 다시 시도해주세요.'},503);
  try {
    await env.EBOOK_LEADS.prepare('INSERT INTO ebook_leads (email, consent_version, consent_at, source, marketing_consent) VALUES (?, ?, ?, ?, 1) ON CONFLICT(email) DO UPDATE SET consent_version=excluded.consent_version, consent_at=excluded.consent_at, marketing_consent=1').bind(email,'2026-09-21-v1',new Date().toISOString(),'/ebook/').run();
    // Access pass (2026-09-23): the PDF opens only for a browser that just signed up here.
    const token = crypto.randomUUID() + crypto.randomUUID().replace(/-/g, '');
    const now = Date.now();
    await ensureAccessTable(env);
    await env.EBOOK_LEADS.prepare('INSERT INTO ebook_access (token, email, created_at, expires_at) VALUES (?, ?, ?, ?)').bind(token, email, new Date(now).toISOString(), new Date(now + ACCESS_DAYS * 864e5).toISOString()).run();
    return Response.json({ok:true}, {status:200, headers:{'Cache-Control':'no-store', 'Set-Cookie':`${ACCESS_COOKIE}=${token}; Path=/ebook; Max-Age=${ACCESS_DAYS * 86400}; HttpOnly; Secure; SameSite=Lax`}});
  } catch { return reply({error:'저장하지 못했습니다. 잠시 후 다시 시도해주세요.'},503); }
}

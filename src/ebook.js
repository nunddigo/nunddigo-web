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
    return reply({ok:true});
  } catch { return reply({error:'저장하지 못했습니다. 잠시 후 다시 시도해주세요.'},503); }
}

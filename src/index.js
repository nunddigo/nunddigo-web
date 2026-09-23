import { signup, hasEbookAccess } from './ebook.js';
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "links.nunddigo.com" && url.pathname === "/ebook/api/signup") return signup(request, env);
    const map = {
      "eyetest.nunddigo.com": "/eyetest",
      "eyefit.nunddigo.com": "/eyefit",
      "links.nunddigo.com": "/links",
    };
    // E-book PDF: never indexed, and only opened right after signing up on /ebook/.
    if (/^\/(?:links\/)?ebook\/.*\.pdf$/i.test(url.pathname)) {
      if (!(await hasEbookAccess(request, env))) {
        return new Response(null, {status: 302, headers: {"Location": "https://links.nunddigo.com/ebook/", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow"}});
      }
      const pdf = await env.ASSETS.fetch(new Request(new URL("/links/ebook/ebook.pdf", url).toString(), request));
      const headers = new Headers(pdf.headers);
      headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
      headers.set("Cache-Control", "private, no-store");
      return new Response(pdf.body, {status: pdf.status, headers});
    }
    const prefix = map[url.hostname];
    // Search cleanup (2026-09-23): the old link page is retired and the studio's
    // single home is nunddigo.com. Internal folder paths must not be reachable twice.
    if (url.hostname === "links.nunddigo.com" && ["/", "/index.html", "/links", "/links/", "/links/index.html"].includes(url.pathname)) {
      return Response.redirect("https://nunddigo.com/", 301);
    }
    if (prefix && (url.pathname === prefix || url.pathname.startsWith(prefix + "/"))) {
      const clean = new URL(url);
      clean.pathname = url.pathname.slice(prefix.length) || "/";
      return Response.redirect(clean.toString(), 301);
    }
    if (prefix && !url.pathname.startsWith(prefix)) {
      url.pathname = prefix + url.pathname;
    }
    const res = await env.ASSETS.fetch(new Request(url.toString(), request));
    if (prefix) return res;
    // Any other host (e.g. *.workers.dev) is a technical duplicate: keep it out of search.
    const dup = new Response(res.body, res);
    dup.headers.set("X-Robots-Tag", "noindex, nofollow");
    return dup;
  }
}

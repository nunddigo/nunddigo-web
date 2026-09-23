import { signup } from './ebook.js';
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "links.nunddigo.com" && url.pathname === "/ebook/api/signup") return signup(request, env);
    const map = {
      "eyetest.nunddigo.com": "/eyetest",
      "eyefit.nunddigo.com": "/eyefit",
      "links.nunddigo.com": "/links",
    };
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
    return env.ASSETS.fetch(new Request(url.toString(), request));
  }
}

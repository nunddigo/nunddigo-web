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
    if (prefix && !url.pathname.startsWith(prefix)) {
      url.pathname = prefix + url.pathname;
    }
    return env.ASSETS.fetch(new Request(url.toString(), request));
  }
}

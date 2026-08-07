export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "eyetest.nunddigo.com" && !url.pathname.startsWith("/eyetest")) {
      url.pathname = "/eyetest" + url.pathname;
    } else if (url.hostname === "eyefit.nunddigo.com" && !url.pathname.startsWith("/eyefit")) {
      url.pathname = "/eyefit" + url.pathname;
    }
    return env.ASSETS.fetch(new Request(url.toString(), request));
  }
}

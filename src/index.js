const MAIN_SITE = "https://nunddigo.com";

function retiredLinkDestination(url) {
  // The same static assets were also reachable below /links on the Worker URL.
  const path = url.pathname.replace(/^\/links(?=\/|$)/i, "") || "/";
  const normalized = path.toLowerCase();
  let target = "/";

  if (/^\/(?:ebook(?:\/|$|\.)|thumb_ebook)/.test(normalized)) {
    target = "/ebook/";
  } else if (/^\/(?:eyetest|thumb_eyetest)(?:\/|$|\.)/.test(normalized)) {
    target = "https://eyetest.nunddigo.com/";
  } else if (/^\/(?:eyefit|thumb_eyefit)(?:\/|$|\.)/.test(normalized)) {
    target = "https://eyefit.nunddigo.com/";
  } else if (/^\/(?:works?|portfolio|project|logos)(?:\/|$|\.)/.test(normalized)) {
    target = "/works";
  } else if (/^\/(?:services?|service)(?:\/|$|\.)/.test(normalized)) {
    target = "/services";
  } else if (/^\/(?:reviews?|review)(?:\/|$|\.)/.test(normalized)) {
    target = "/reviews";
  } else if (/^\/(?:insights?|ideas|articles?|blog)(?:\/|$|\.)/.test(normalized)) {
    target = "/insights";
  } else if (/^\/(?:consult|contact|kakao)(?:\/|$|\.)/.test(normalized)) {
    target = "/#consult";
  } else if (normalized === "/sitemap.xml" || normalized === "/robots.txt") {
    target = normalized;
  }

  const destination = new URL(target, MAIN_SITE);
  destination.search = url.search;
  return destination;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Retire only the link hub. The eye-test and eye-fit hosts keep their assets.
    if (url.hostname === "links.nunddigo.com" || (url.hostname.endsWith(".workers.dev") && (url.pathname === "/links" || url.pathname.startsWith("/links/")))) {
      return Response.redirect(retiredLinkDestination(url).toString(), 301);
    }
    const map = {
      "eyetest.nunddigo.com": "/eyetest",
      "eyefit.nunddigo.com": "/eyefit",
    };
    const prefix = map[url.hostname];
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

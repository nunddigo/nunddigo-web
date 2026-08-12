# 눈띄고 웹 (nunddigo-web)

Cloudflare Workers 정적 자산 배포. 빌드 없음. `main` 브랜치 push하면 자동 배포.

## ⚠ 먼저 알아야 할 것: 이 저장소는 nunddigo.com이 아니다

| 주소 | 서빙 주체 | 이 저장소가 관여? |
|---|---|---|
| **nunddigo.com** | **Figma Sites** | ❌ 전혀 없음 |
| eyetest.nunddigo.com | Cloudflare Worker | ✅ `/eyetest` |
| eyefit.nunddigo.com | Cloudflare Worker | ✅ `/eyefit` |
| links.nunddigo.com | Cloudflare Worker | ✅ `/links` |
| links.nunddigo.com/ebook/ | Cloudflare Worker | ✅ `/links/ebook` |

**apex 도메인(nunddigo.com)은 Figma Sites가 서빙한다.** 이 저장소를 아무리 고쳐도
nunddigo.com은 바뀌지 않는다. 홈 수정·메타태그·소유확인·OG 이미지는
**Figma Sites 편집기에서** 해야 한다.

판별법: `src/index.js`의 hostname 맵에 없는 호스트는 이 저장소 소관이 아니다.

## 구조

```
/eyetest        브랜드 시력검사 (noindex)
/eyefit         디자인 눈맞춤 (noindex)
/links          링크 허브 · 정본, GA4 G-S1NFPKF6DF
/links/ebook    무료 전자책 (2026-08 넷리파이에서 이관)
404.html        브랜드 404 (모든 미매칭 경로)
_headers        보안 헤더 · 캐시 정책 (Cloudflare)
_redirects      경로 정규화 (Cloudflare)
netlify.toml    ⚠ Netlify 전용. 구 nunddigo.netlify.app → 정본 301
src/index.js    호스트명 → 경로 프리픽스 매핑 워커
```

## 폐기 기록 (2026-08-12)

루트에 있던 `index.html` `robots.txt` `sitemap.xml` `og_image.jpg` `favicon.svg` 삭제.
넷리파이 시절 홈페이지의 잔재였고, apex가 Figma로 넘어간 뒤로는 아무도 서빙하지 않았다.
남겨두면 "이게 nunddigo.com 홈"이라는 오해를 만든다. 실제로 만들었다. 필요하면 git 이력에 있다.

동시에 정리한 것:
- 넷리파이 3개 사이트 → 301 리다이렉트 (패키지: `04_웹서비스_시력검사/_넷리파이_리다이렉트_패키지/`)
- 전자책을 `links/ebook/`으로 이관, links 링크 교체
- 루트 `robots.txt`/`sitemap.xml`이 `nunddigo.netlify.app`을 가리키던 문제는 파일 삭제로 소멸

## 배포

`배포.command` 더블클릭. 또는 `git push`.

## 규율

- 내부 격리 용어(검안·도수·조제·피팅·란돌트·듀오크롬) 대외 카피 사용 금지
- 없는 숫자·실적 창작 금지
- 엠대시(—) 사용 금지
- 도구 사이트(eyetest·eyefit)는 noindex 유지. 유입은 links 허브 경유

/* 눈띄고 상담 안내 · 선택형 패널
   - 자유 대화 AI가 아니다. 미리 정한 화면만 보여준다.
   - 수집·전송·서버 저장 없음. 복사는 사용자가 버튼을 눌렀을 때만 한다.
   - FAQ 원문은 concierge-data.js 한 곳에서만 관리한다. */
(async () => {
  'use strict';
  if (document.querySelector('.concierge-launcher') || window.__nunddigoConciergeLoading) return;
  window.__nunddigoConciergeLoading = true;
  const widgetBase = new URL('.', document.currentScript.src);
  const asset = path => new URL(path, widgetBase).href;
  const css = document.querySelector('link[href*="concierge.css"]') || document.createElement('link');
  css.rel = 'stylesheet'; css.href = asset('concierge.css?v=20260921-nonmodal');
  if (!css.isConnected) document.head.append(css);
  try {
    await new Promise((resolve, reject) => { const script=document.createElement('script'); script.src=asset('concierge-data.js?v=20260921-final'); script.onload=resolve; script.onerror=reject; document.head.append(script); });
  } catch { window.__nunddigoConciergeLoading=false; return; }
  const DATA = window.NUNDDIGO_FAQ;
  if (!DATA || !Array.isArray(DATA.items)) return;
  const ITEMS = DATA.items;
  const CATEGORIES = DATA.categories;
  const KAKAO = 'http://pf.kakao.com/_emxgvK/chat';
  const EYETEST = 'https://eyetest.nunddigo.com/';
  const MAIL = 'nunddigo@gmail.com';

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const chat = (label = '카카오에서 빠른 상담 →') =>
    `<a class="cc-act" href="${KAKAO}" target="_blank" rel="noopener">${label}</a>`;
  const mailNote = `<p class="cc-note">카카오가 열리지 않으면 ${MAIL} 으로 보내주셔도 됩니다. 이 화면에서 자동으로 발송되지 않습니다.</p>`;

  /* ---------- 화면 ---------- */
  const screens = {
    home: () => `
      <h2>어떤 도움이 필요하세요?</h2>
      <p>필요한 내용을 골라주세요.</p>
      <button class="cc-act" type="button" data-go="services">나에게 맞는 서비스 찾기</button>
      <button class="cc-act" type="button" data-go="estimate">견적과 일정 알아보기</button>
      <button class="cc-act" type="button" data-go="faq">자주 묻는 질문</button>
      <button class="cc-act" type="button" data-go="existing">이미 작업을 맡기신 분</button>
      <a class="cc-act" href="${EYETEST}" target="_blank" rel="noopener">무료 브랜드 시력검사 →</a>
      ${chat()}`,

    services: () => `
      <h2>어디에 사용할 디자인인가요?</h2>
      <p>쓰일 장면을 고르시면 해당 서비스로 이동합니다.</p>
      <a class="cc-act" href="${KAKAO}" target="_blank" rel="noopener">온라인에서 브랜드 소개하기 →</a>
      <a class="cc-act" href="${KAKAO}" target="_blank" rel="noopener">미팅·제안에서 설득하기 →</a>
      <a class="cc-act" href="${KAKAO}" target="_blank" rel="noopener">상품·서비스의 구매 이유 전하기 →</a>
      <a class="cc-act" href="${KAKAO}" target="_blank" rel="noopener">이야기를 한 권으로 담기 →</a>
      <button class="cc-act" type="button" data-go="multi">여러 개가 필요해요</button>
      <button class="cc-act" type="button" data-go="unsure">아직 무엇이 필요한지 모르겠어요</button>`,

    multi: () => `
      <h2>우선순위부터 정합니다.</h2>
      <p>여러 매체를 함께 맡기실 수 있습니다.</p>
      <p>먼저 쓰실 것과 나중에 쓰실 것을 나누면, 공통 기준을 한 번만 잡고 순서대로 진행할 수 있습니다.</p>
      <p>필요한 매체와 사용 일정을 알려주세요.</p>
      ${chat()}`,

    unsure: () => `
      <h2>고민부터 들려주세요.</h2>
      <p>현재 자료와 사용 목적만 있어도 시작할 수 있습니다.</p>
      <p>브랜드 시력검사로 먼저 살펴보시거나, 상담에서 필요한 작업을 함께 정해요.</p>
      <a class="cc-act" href="${EYETEST}" target="_blank" rel="noopener">브랜드 시력검사 →</a>
      ${chat()}`,

    estimate: () => `
      <h2>세 가지만 준비해주세요.</h2>
      <ol>
        <li>필요한 작업과 대략적인 분량</li>
        <li>현재 준비된 원고·사진·기존 자료</li>
        <li>희망 완료일</li>
      </ol>
      <p>비용과 가능한 일정은 범위를 확인한 뒤 안내드립니다. 이 화면에서는 금액이나 착수일을 확정해 드리지 않습니다.</p>
      <button class="cc-act" type="button" data-copy>상담 양식 복사하기</button>
      <p class="cc-copy" role="status" aria-live="polite"></p>
      ${chat()}
      ${mailNote}`,

    existing: () => `
      <h2>어떤 문의인가요?</h2>
      <button class="cc-act" type="button" data-go="existing-edit">수정이나 추가 작업이 필요해요</button>
      <button class="cc-act" type="button" data-go="existing-fix">인계나 오류 관련 문의예요</button>`,

    'existing-edit': () => `
      <h2>세 가지를 알려주세요.</h2>
      <ol>
        <li>브랜드명</li>
        <li>이전에 진행한 작업</li>
        <li>바꾸고 싶은 내용과 희망 일정</li>
      </ol>
      <p>수정 라운드가 남아 있는지, 새 작업으로 볼 범위인지 먼저 확인해 드립니다.</p>
      ${chat()}
      ${mailNote}`,

    'existing-fix': () => `
      <h2>화면과 상황을 함께 보내주세요.</h2>
      <ol>
        <li>브랜드명과 납품받은 작업</li>
        <li>문제가 보이는 화면</li>
        <li>언제, 어떤 순서로 하다가 생겼는지</li>
      </ol>
      <p>파일은 이 화면에서 올릴 수 없습니다. 카카오 상담으로 보내주세요.</p>
      ${chat()}
      ${mailNote}`,

    faq: () => `
      <h2>궁금한 주제를 골라주세요.</h2>
      <p>${ITEMS.length}개의 답변에서 궁금한 내용을 찾아보세요.</p>
      <form class="cc-search" role="search" data-search>
        <label for="cc-q">질문 검색</label>
        <input id="cc-q" name="q" type="search" autocomplete="off" placeholder="예: 기간, 수정, 원본, 세금계산서">
        <button class="cc-act" type="submit">검색</button>
      </form>
      ${CATEGORIES.map(c => `<button class="cc-act" type="button" data-go="cat:${c}">${c} · ${ITEMS.filter(i => i.category === c).length}개 질문</button>`).join('')}`,

    cat: name => {
      const list = ITEMS.filter(i => i.category === name);
      return `<h2>${esc(name)} 안내</h2>
        ${list.map(faqBlock).join('')}
        <button class="cc-act" type="button" data-go="faq">다른 주제 보기</button>
        ${chat('더 물어보고 싶으면 카카오 상담 →')}`;
    },

    search: q => {
      const hits = searchFaq(q);
      if (!hits.length) {
        return `<h2>찾는 질문이 없습니다.</h2>
          <p>‘${esc(q)}’ 로는 결과가 없습니다. 다른 낱말로 찾아보시거나, 주제별로 살펴보세요.</p>
          <button class="cc-act" type="button" data-go="faq">주제별로 보기</button>
          ${chat('바로 물어보기 →')}`;
      }
      return `<h2>‘${esc(q)}’ 검색 결과 ${hits.length}개</h2>
        ${hits.map(faqBlock).join('')}
        <button class="cc-act" type="button" data-go="faq">주제별로 보기</button>`;
    }
  };

  const faqBlock = item =>
    `<details class="cc-faq"><summary>${esc(item.question)}</summary><p>${esc(item.answer)}</p></details>`;

  function searchFaq(raw) {
    const q = String(raw || '').trim().toLowerCase();
    if (!q) return [];
    const terms = q.split(/\s+/).filter(Boolean);
    return ITEMS.filter(item => {
      const hay = (item.question + ' ' + item.answer + ' ' + item.keywords.join(' ')).toLowerCase();
      return terms.some(t => hay.includes(t));
    });
  }

  /* ---------- 패널 ---------- */
  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.className = 'concierge-launcher';
  launcher.setAttribute('aria-label', '눈띄고 안내소 열기');
  launcher.setAttribute('aria-expanded','false');
  launcher.innerHTML = `<span class="concierge-orb"><img class="cc-face" src="${asset('assets/concierge-face.svg')}" alt=""><img class="cc-thinking" src="${asset('assets/concierge-thinking.png')}" alt=""></span><span class="cc-launch-label">도움이 필요하세요?</span>`;
  launcher.setAttribute('aria-haspopup', 'dialog');

  const panel = document.createElement('dialog');
  panel.className = 'concierge-panel';
  panel.setAttribute('aria-labelledby', 'concierge-title');
  panel.innerHTML =
    `<div class="concierge-header">
       <div class="cc-heading"><strong id="concierge-title">눈띄고 안내소</strong></div>
       <button class="cc-metal" type="button" data-close aria-label="안내소 닫기">×</button>
     </div>
     <div class="cc-workspace"><aside class="cc-rail" aria-hidden="true"><span class="cc-hatch"></span><img src="${asset('assets/menu-profile.png')}" alt=""></aside><div class="cc-main">
     <div class="concierge-nav" hidden><button type="button" data-back>← 뒤로</button><button type="button" data-go="home">처음으로</button></div>
     <div class="concierge-content" tabindex="-1"></div></div></div>
     <div class="concierge-footer">궁금한 내용을 확인하고, 필요하면 상담으로 이어가세요.</div>`;
  document.body.append(launcher, panel);

  const content = panel.querySelector('.concierge-content');
  const nav = panel.querySelector('.concierge-nav');
  const stack = [];

  function render(view) {
    const [name, param] = view;
    const build = screens[name];
    if (!build) return;
    content.innerHTML = build(param);
    content.querySelectorAll('a[href]').forEach(a => { a.href = new URL(a.getAttribute('href'), widgetBase).href; });
    content.scrollTop = 0;
    nav.hidden = stack.length <= 1;
    content.focus({preventScroll:true});
  }

  function go(view, replace) {
    if (replace) stack.pop();
    stack.push(view);
    render(view);
  }

  function back() {
    if (stack.length > 1) stack.pop();
    render(stack[stack.length - 1]);
  }

  function open() {
    stack.length = 0;
    panel.show();
    launcher.setAttribute('aria-expanded','true');
    go(['home']);
  }

  launcher.addEventListener('click', () => panel.open ? panel.close() : open());
  panel.addEventListener('keydown', event => { if(event.key === 'Escape') { event.preventDefault(); panel.close(); } });
  panel.querySelector('[data-close]').addEventListener('click', () => panel.close());
  panel.addEventListener('close', () => { launcher.setAttribute('aria-expanded','false'); launcher.focus({preventScroll:true}); });
  panel.querySelector('[data-back]').addEventListener('click', back);

  panel.addEventListener('click', async event => {
    const trigger = event.target.closest('[data-go],[data-copy]');
    if (!trigger || !panel.contains(trigger)) return;

    if (trigger.dataset.go) {
      const target = trigger.dataset.go;
      if (target === 'home') { stack.length = 0; go(['home']); return; }
      if (target.startsWith('cat:')) { go(['cat', target.slice(4)]); return; }
      go([target]);
      return;
    }

    if (trigger.hasAttribute('data-copy')) {
      const form = '브랜드명:\n필요한 작업·분량:\n준비된 자료:\n희망 완료일:\n궁금한 점:';
      const status = content.querySelector('.cc-copy');
      try {
        await navigator.clipboard.writeText(form);
        status.textContent = '복사했어요. 카카오 상담에 붙여넣어 주세요.';
      } catch {
        status.textContent = form;
      }
    }
  });

  panel.addEventListener('submit', event => {
    const form = event.target.closest('[data-search]');
    if (!form) return;
    event.preventDefault();
    const q = form.querySelector('input[name=q]').value;
    if (!q.trim()) return;
    go(['search', q.trim()]);
  });
})();

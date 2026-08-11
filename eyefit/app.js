/* 눈맞춤 · BRAND EYE-FIT */
var W3F_KEY="0029a0f8-10c8-4a51-b0e5-b54daee79213";
var CONTACT={kakao:"http://pf.kakao.com/_emxgvK/chat",mail:"nunddigo@gmail.com"};
var KEY="nunddigo_eyefit_v1", LAST=9;
var S={step:0,sector:"",goals:[],svc:"",page:0,axes:[3,3,3,3,3,3,3],touched:[],
       moods:[],free:"",bg:-1,point:-1,hexBg:"",hexPt:"",secEtc:"",goalEtc:"",guide:false,sent:false,sw:{},swi:0,auto:false};
var seen={}, $=function(i){return document.getElementById(i)};

function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function load(){try{var o=JSON.parse(localStorage.getItem(KEY));return(o&&o.step>0)?o:null}catch(e){return null}}

/* ── 화면 전환 ── */
function go(n){
  n=Math.max(0,Math.min(LAST,n)); S.step=n; save();
  for(var i=0;i<=LAST;i++){var e=$('s'+i); if(e)e.classList.toggle('active',i===n)}
  var show=(n>0&&n<9);
  $('topbar').classList.toggle('show',show);
  var done=[0,0,1,2,3,4,5,6,7,7][n];
  $('fill').style.width=(done/7*100)+'%';
  $('cnt').textContent=done+' / 7';
  if(n===4)drawSwipe();
  if(n===5)renderAnchors();
  if(n===6)markRec();
  if(n===8)runScan();
  if(n===9)renderSheet();
  window.scrollTo(0,0); refresh();
}
document.querySelectorAll('[data-go]').forEach(function(b){b.onclick=function(){go(+b.dataset.go)}});
$('start').onclick=function(){go(1)};
$('again').onclick=function(){localStorage.removeItem(KEY);location.reload()};
$('kko').onclick=function(){window.open(CONTACT.kakao,'_blank','noopener')};

/* ── 되받아치기 ── */
function talk(t,e){ if(!t||seen[t])return; seen[t]=1;
  $('tE').textContent=e||'-_-'; $('tT').textContent=t; $('talk').classList.add('on')}
$('tX').onclick=function(){$('talk').classList.remove('on')};
$('talk').onclick=function(ev){if(ev.target===this)this.classList.remove('on')};

/* ── 카드 ── */
function cards(el,arr,isOn,onPick){
  el.innerHTML=arr.map(function(o,i){
    return '<button type="button" class="card'+(o.lock?' lock':'')+(isOn(i)?' on':'')+'"'+
    (o.lock?' disabled':' data-i="'+i+'"')+'><span class="nm">'+o.n+'</span>'+
    (o.d?'<span class="dc">'+o.d+'</span>':'')+'</button>'}).join('');
  el.querySelectorAll('.card[data-i]').forEach(function(b){b.onclick=function(){onPick(+b.dataset.i)}})}

function drawSector(){cards($('gSector'),SECTORS,function(i){return S.sector===SECTORS[i].k},
  function(i){S.sector=SECTORS[i].k;save();drawSector();refresh()});
  var on=S.sector==='etc';$('secEtcWrap').classList.toggle('show',on);
  if(on)setTimeout(function(){$('secEtc').focus()},80)}
$('secEtc').oninput=function(){S.secEtc=this.value.trim();save();refresh()};
function drawGoal(){cards($('gGoal'),GOALS,function(i){return S.goals.indexOf(GOALS[i].k)>=0},
  function(i){var k=GOALS[i].k,x=S.goals.indexOf(k);
    if(x>=0)S.goals.splice(x,1);else S.goals.push(k);save();drawGoal();refresh()});
  var on=S.goals.indexOf('getc')>=0;$('goalEtcWrap').classList.toggle('show',on);
  if(on)setTimeout(function(){$('goalEtc').focus()},80)}
$('goalEtc').oninput=function(){S.goalEtc=this.value.trim();save();refresh()};
function drawSvc(){
  $('gLock').innerHTML=LOCKS.map(function(o){
    return '<button type="button" class="card lock" disabled><span class="nm">'+o.n+'</span><span class="dc">'+o.d+'</span></button>'}).join('');
  cards($('gSvc'),SVCS,function(i){return S.svc===SVCS[i].k},function(i){
    S.svc=SVCS[i].k;
    if(S.svc!=='pf'&&S.page>0){S.page=0;talk('쓰임을 바꾸셔서, 고르셨던 페이지는 지웠습니다.')}
    save();drawSvc();refresh()});
  $('pageWrap').style.display=(S.svc==='pf')?'block':'none';
  if(S.svc==='pf')drawPage()}
function drawPage(){
  cards($('gPage'),PAGES.map(function(p){return{n:p.n}}),function(i){return S.page===i},
    function(i){S.page=i;save();drawPage()});
  var q=PAGES[S.page].q,e=$('pageQ');
  e.style.display=q?'block':'none'; e.textContent=q?'❝ '+q+' ❞':''}


/* ── 스와이프 ── */
function drawSwipe(){
  if(S.swi>=SWIPE.length){S.swi=SWIPE.length-1}
  var f=SWIPE[S.swi];
  $('swNo').textContent=Math.min(S.swi+1,SWIPE.length);
  $('swImg').src='anchors/'+f+'.jpg';
  $('swCard').classList.remove('go');
  $('swOv').className='swov';$('swOv').style.background='';
  $('swBack').disabled=(S.swi===0);
  refresh()}
var swLock=false;
function markSwipe(v){
  if(swLock)return; swLock=true;
  var f=SWIPE[S.swi]; S.sw[f]=v;
  var o=$('swOv');
  $('swMk').textContent=v>0?'○':(v<0?'✕':'△');
  o.style.background=v>0?'rgba(27,174,114,.82)':(v<0?'rgba(218,58,51,.82)':'rgba(201,133,46,.82)');
  o.className='swov on';
  setTimeout(function(){$('swCard').classList.add('go')},260);
  setTimeout(function(){
    S.swi++; save(); swLock=false;
    if(S.swi>=SWIPE.length){applySwipe();go(5);return}
    drawSwipe()},520)}
$('swBack').onclick=function(){
  if(S.swi<=0)return; S.swi--; delete S.sw[SWIPE[S.swi]]; save(); drawSwipe()};
$('swReset').onclick=function(){
  S.swi=0;S.sw={};S.auto=false;save();drawSwipe()};
function applySwipe(){
  /* O/X 가중 평균 → 7축 좌표 */
  for(var i=0;i<7;i++){
    var pos=[],neg=[];
    for(var k in S.sw){ if(S.sw[k]>0)pos.push(SB[k][i]); else if(S.sw[k]<0)neg.push(SB[k][i]) }
    var av=function(a){return a.reduce(function(x,y){return x+y},0)/a.length};
    var v;
    if(pos.length&&neg.length){ var p=av(pos),n=av(neg); v=p+(p-n)*0.35 }
    else if(pos.length){ v=av(pos) }
    else if(neg.length){ v=6-av(neg) }
    else { v=3 }
    S.axes[i]=Math.max(1,Math.min(5,Math.round(v)));
    if(S.touched.indexOf(i)<0)S.touched.push(i);
  }
  S.auto=true; save();
  $('axes').querySelectorAll('input').forEach(function(e,i){e.value=S.axes[i]});
  AX.forEach(function(a,i){$('ax'+i).classList.add('on')});
  $('axTitle').textContent='이렇게 잡혔습니다';
  $('axSub').textContent='좋다고 하신 것들의 평균입니다. 어색한 축이 있으면 밀어서 고치세요.'}
document.querySelectorAll('.swb').forEach(function(b){b.onclick=function(){markSwipe(+b.dataset.v)}});
$('skipSw').onclick=function(){
  S.auto=false;save();
  $('axTitle').textContent='영점을 맞춰볼까요';
  $('axSub').textContent='좌우로 밀어보세요. 밀 때마다 위 그림이 바뀝니다. 최소 세 축은 밀어주셔야 결이 잡힙니다.';
  go(5)};
/* 카드 드래그 */
(function(){var x0=null,c=$('swCard');
 c.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
 c.addEventListener('touchend',function(e){ if(x0===null)return;
   var dx=e.changedTouches[0].clientX-x0; x0=null;
   if(Math.abs(dx)>60)markSwipe(dx>0?1:-1)});
 c.addEventListener('mousedown',function(e){x0=e.clientX});
 window.addEventListener('mouseup',function(e){ if(x0===null)return;
   var dx=e.clientX-x0; x0=null; if(Math.abs(dx)>60)markSwipe(dx>0?1:-1)});
})();

/* ── 축 ── */
function drawAxes(){
  $('axes').innerHTML=AX.map(function(a,i){
    return '<div class="ax'+(S.touched.indexOf(i)>=0?' on':'')+'" id="ax'+i+'">'+
    '<div class="axl"><span>'+a.l+'</span><span>'+a.r+'</span></div>'+
    '<input type="range" min="1" max="5" step="1" value="'+S.axes[i]+'" data-i="'+i+'" aria-label="'+a.l+' 대 '+a.r+'"></div>'}).join('');
  for(var i=0;i<3;i++){var f=document.createElement('figure');
    f.innerHTML='<img alt=""><figcaption>· 눈띄고 작업</figcaption>';$('pv').appendChild(f)}
  var t=null;
  $('axes').addEventListener('input',function(e){
    if(e.target.type!=='range')return;
    var i=+e.target.dataset.i; S.axes[i]=+e.target.value;
    if(S.touched.indexOf(i)<0){S.touched.push(i);$('ax'+i).classList.add('on')}
    S.auto=false;save();refresh();clearTimeout(t);t=setTimeout(renderAnchors,110);
    if(S.touched.length>=5&&S.touched.every(function(k){return S.axes[k]===3}))talk(TALK.axmid)})}
function dist(v){var d=0;S.touched.forEach(function(i){var x=v[i]-S.axes[i];d+=x*x});return d}
function nearest(){var a=[];for(var k in SB)a.push([k,dist(SB[k])]);
  a.sort(function(x,y){return x[1]-y[1]});return a.slice(0,3)}
function renderAnchors(){
  var p=S.touched.length?nearest():[["69"],["48"],["58"]];
  var im=$('pv').querySelectorAll('img');
  for(var i=0;i<3;i++)(function(g,f){ if(g.dataset.f===f)return; g.dataset.f=f;
    g.classList.add('f'); setTimeout(function(){g.src='anchors/'+f+'.jpg';
      g.onload=function(){g.classList.remove('f')}},100)})(im[i],p[i][0])}

/* ── 무드 ── */
function drawMood(){
  $('gMood').innerHTML=MOODS.map(function(m,i){var s=SW[i];
    return '<div class="mood'+(S.moods.indexOf(i)>=0?' on':'')+'" data-i="'+i+'">'+
    '<div class="pg" style="background:'+s.bg+'">'+s.el+'</div>'+
    '<div class="nm">'+m.n+'</div><div class="dc">'+m.d+'</div>'+
    '<div class="peek">▸ 실물 보기</div><div class="real"></div></div>'}).join('');
  $('gMood').querySelectorAll('.mood').forEach(function(d){
    var i=+d.dataset.i;
    var sel=function(){var x=S.moods.indexOf(i);
      if(x>=0){S.moods.splice(x,1);d.classList.remove('on')}
      else{if(S.moods.length>=2){talk(TALK.mood3);return}S.moods.push(i);d.classList.add('on')}
      save();refresh();checkCombo()};
    d.querySelector('.pg').onclick=sel; d.querySelector('.nm').onclick=sel;
    d.querySelector('.peek').onclick=function(){var r=d.querySelector('.real');
      if(r.innerHTML){r.innerHTML='';this.textContent='▸ 실물 보기'}
      else{r.innerHTML='<img src="anchors/'+MOODS[i].pk+'.jpg" alt="">';this.textContent='▾ 접기'}}})}
function markRec(){
  document.querySelectorAll('.mood').forEach(function(e){e.classList.remove('rec')});
  if(!S.touched.length)return;
  MOODS.map(function(m,i){return[i,dist(m.v)]}).sort(function(a,b){return a[1]-b[1]}).slice(0,3)
   .forEach(function(x){var e=document.querySelector('.mood[data-i="'+x[0]+'"]');if(e)e.classList.add('rec')})}
$('freeIn').oninput=function(){
  var v=this.value.trim(); S.free=v; save();
  if(v.length<2){$('sugg').innerHTML='';return}
  if(v.split(/\s+/).length>2){$('sugg').innerHTML='한 단어로 적어보세요. 문장은 검색어가 안 됩니다.';return}
  var hit=-1;for(var k in KEYMAP){if(k.indexOf(v)===0||v.indexOf(k)===0){hit=KEYMAP[k];break}}
  $('sugg').innerHTML=hit>=0?'가장 가까운 결은 <b>'+MOODS[hit].n+'</b>입니다. 맞나요?'
    :'사전에 없는 말이네요. ...그럼 앞 단계에서 <b>좌우로</b> 잡아볼까요?'};

/* ── 컬러 ── */
function drawColor(){
  $('gBg').innerHTML=BGS.map(function(c,i){return '<button type="button" data-i="'+i+'" class="'+(S.bg===i?'on':'')+'"><span class="ci" style="background:'+c[1]+'"></span>'+c[0]+'</button>'}).join('');
  $('gPoint').innerHTML=POINTS.map(function(c,i){return '<button type="button" data-i="'+i+'" class="'+(S.point===i?'on':'')+'"><span class="ci" style="background:'+(c[1]||'transparent')+'"></span>'+c[0]+'</button>'}).join('');
  $('gBg').querySelectorAll('button').forEach(function(b){b.onclick=function(){S.bg=+b.dataset.i;save();drawColor();refresh()}});
  $('gPoint').querySelectorAll('button').forEach(function(b){b.onclick=function(){
    S.point=+b.dataset.i;save();drawColor();refresh();if(S.point===0)talk(TALK.pointnone,'O_-');checkCombo()}})}
function hexNear(h){var m=h.match(/^#?([0-9a-f]{6})$/i);if(!m)return-1;
  var n=parseInt(m[1],16),r=n>>16,g=(n>>8)&255,b=n&255,best=-1,bd=1e9;
  BGS.forEach(function(c,i){var v=parseInt(c[1].slice(1),16);
    var d=Math.pow(r-(v>>16),2)+Math.pow(g-((v>>8)&255),2)+Math.pow(b-(v&255),2);
    if(d<bd){bd=d;best=i}});return best}
function nearIn(h,arr,from){var m=(h||'').match(/^#?([0-9a-fA-F]{6})$/);if(!m)return-1;
  var n=parseInt(m[1],16),r=n>>16,g=(n>>8)&255,b=n&255,best=-1,bd=1e9;
  arr.forEach(function(c,i){ if(!c[1])return;
    var v=parseInt(c[1].slice(1),16);
    var d=Math.pow(r-(v>>16),2)+Math.pow(g-((v>>8)&255),2)+Math.pow(b-(v&255),2);
    if(d<bd){bd=d;best=i}});return best}
function bindHex(txtId,pickId,sugId,arr,setter,label){
  var t=$(txtId),pk=$(pickId),sg=$(sugId);
  t.oninput=function(){
    var v=this.value.trim(); if(v&&v[0]!=='#'){v='#'+v;this.value=v}
    this.value=this.value.toUpperCase(); v=this.value;
    setter(v);save();
    if(/^#[0-9A-F]{6}$/.test(v))pk.value=v;
    var n=nearIn(v,arr);
    sg.innerHTML=n<0?(v.length>1?'<span style="color:var(--muted)">여섯 자리로 적어주세요. 예) #1F3226</span>':'')
      :'가장 가까운 '+label+'은 <b>'+arr[n][0]+'</b>입니다. 아래에서 골라뒀습니다.';
    if(n>=0){
      if(label==='배경')S.bg=n; else S.point=n;
      save();drawColor();refresh()}};
  pk.oninput=function(){t.value=this.value.toUpperCase();t.oninput.call(t)}}
bindHex('hexBg','hexBgPick','hexBgSug',BGS,function(v){S.hexBg=v},'배경');
bindHex('hexPt','hexPtPick','hexPtSug',POINTS,function(v){S.hexPt=v},'포인트');
document.querySelectorAll('.bb-b').forEach(function(b){b.onclick=function(){
  document.querySelectorAll('.bb-b').forEach(function(x){x.classList.remove('sel')});
  b.classList.add('sel');
  var yes=b.dataset.v==='y';
  $('bbPick').classList.toggle('on',yes);
  $('brandBox').classList.toggle('on',yes);
  if(yes){setTimeout(function(){$('hexBg').focus()},120)}
  else{S.hexBg='';S.hexPt='';$('hexBg').value='';$('hexPt').value='';
    $('hexBgSug').innerHTML='';$('hexPtSug').innerHTML='';save()}}});

function checkCombo(){COMBO.forEach(function(c){
  if(c.m&&!c.m.every(function(i){return S.moods.indexOf(i)>=0}))return;
  if(c.c&&!c.c.every(function(i){return S.moods.indexOf(i)>=0}))return;
  if(c.g&&S.goals.indexOf(c.g)<0)return;
  if(c.noPage!==undefined&&S.page===c.noPage)return;
  talk(c.t,'O_-')})}

/* ── 검색어 ── */
function cap5(parts){var out=[],n=0;
  for(var i=0;i<parts.length;i++){ if(!parts[i])continue;
    var w=String(parts[i]).trim().split(/\s+/).filter(Boolean);
    if(n+w.length>5)continue; out=out.concat(w); n+=w.length}
  return out.join(' ')}
function queries(){
  var m=S.moods.map(function(i){return MOOD_EN[i]});
  var pg=PAGES[S.page].en, sv=SVCS.filter(function(s){return s.k===S.svc})[0];
  var sec=SECTORS.filter(function(s){return s.k===S.sector})[0], isPf=(sv&&sv.k==='pf');
  var pin=cap5([m[0],pg,m[1],sec.en]);
  var beh=cap5([m[0],isPf?'brand deck':sec.en,sec.en,m[1]]);
  var isu=cap5([m[0],isPf?'brand book':'lookbook',sec.en]);
  var f=function(q){return q.split(' ').filter(Boolean).length<3?cap5([q,sec.en]):q};
  return {pinterest:{q:f(pin)||sec.en,u:'https://kr.pinterest.com/search/pins/?q='},
          behance:{q:f(beh)||sec.en,u:'https://www.behance.net/search/projects/'},
          issuu:{q:f(isu)||sec.en,u:'https://issuu.com/search?q='}}}
var MCODE=['MN','QL','EM','MC','DR','NE','VP','CT','BG','SR','KU','VR'];
var BCODE=['WH','IV','BE','WG','LG','BK','NV','GR','BR','BD'];
function code(){var d=new Date(),p=function(n){return String(n).padStart(2,'0')};
  var si=SECTORS.map(function(s){return s.k}).indexOf(S.sector)+1;
  var mm=S.moods.map(function(i){return MCODE[i]}).join('')||'--';
  var bg=S.bg>=0?BCODE[S.bg]:'--';
  var gl=S.goals.map(function(k){return GOALS.map(function(g){return g.k}).indexOf(k)+1}).sort().join('');
  return 'F1-'+String(d.getFullYear()).slice(2)+p(d.getMonth()+1)+p(d.getDate())+
    '-'+si+(S.page||0)+'-'+mm+'.'+bg+'-'+(gl||'0')}

/* ── 검안 중 ── */
function runScan(){
  var m=['결을 맞추는 중…','좌표를 재는 중…','시장을 훑는 중…','검색어를 조립하는 중…'],i=0;
  $('scanT').textContent=m[0];
  var t=setInterval(function(){i++;if(i<m.length)$('scanT').textContent=m[i]},520);
  setTimeout(function(){clearInterval(t);go(9)},2100)}

function goalNames(){return S.goals.map(function(k){
  var g=GOALS.filter(function(x){return x.k===k})[0];
  return (k==='getc'&&S.goalEtc)?S.goalEtc:g.n})}
function secName(){var x=SECTORS.filter(function(y){return y.k===S.sector})[0];
  return (S.sector==='etc'&&S.secEtc)?S.secEtc:x.n}
/* ── 결과지 ── */
function eyeSVG(v){
  var col=v<=0.7?"var(--red)":v<=1.3?"var(--amber)":"var(--green)";var eye;
  if(v<=0.7){ eye='<path d="M22 40 Q36 47 50 40" fill="none" stroke="'+col+'" stroke-width="3.4" stroke-linecap="round"/><path d="M25 44 l-2 3 M36 46 l0 3.4 M47 44 l2 3" stroke="'+col+'" stroke-width="2.4" stroke-linecap="round"/>'; }
  else if(v<=1.3){ eye='<path d="M21 40 Q36 29 51 40" fill="none" stroke="'+col+'" stroke-width="3.2" stroke-linecap="round"/><circle cx="36" cy="39" r="4.4" fill="'+col+'"/>'; }
  else { eye='<path d="M19 36 Q36 21 53 36 Q36 51 19 36 Z" fill="none" stroke="'+col+'" stroke-width="3.2" stroke-linejoin="round"/><circle cx="36" cy="36" r="6.2" fill="'+col+'"/>'; }
  return '<svg viewBox="0 0 72 72" width="64" height="64"><circle cx="36" cy="36" r="33" fill="none" stroke="var(--line2)" stroke-width="2"/>'+eye+'</svg>';
}

var VERD=[
 {max:0.4,t:"결이 아직 안 잡혔습니다.",e:"-_-",s:"축을 더 밀어보세요. 가운데는 아무 데도 아닙니다."},
 {max:0.9,t:"방향은 있는데, 흐립니다.",e:"-_-",s:"한 축만 더 밀면 결이 섭니다."},
 {max:1.4,t:"결이 보입니다.",e:"O_-",s:"이 정도면 디자이너가 상상할 일이 줄어듭니다."},
 {max:2.1,t:"결이 뚜렷합니다.",e:"O_o",s:"뚜렷한 만큼 호불호도 갈립니다. 그게 눈에 띄는 값입니다."}];
function sharp(){ /* 결 선명도 0.0~2.0 */
  if(!S.touched.length)return 0;
  var sum=0; for(var i=0;i<7;i++)sum+=Math.abs(S.axes[i]-3);
  return Math.round(sum/7/2*2*10)/10}
function renderSheet(){
  var sec=SECTORS.filter(function(s){return s.k===S.sector})[0];
  var gs=S.goals.map(function(k){return GOALS.filter(function(g){return g.k===k})[0]});
  var sv=SVCS.filter(function(s){return s.k===S.svc})[0];
  var d=new Date(),p=function(n){return String(n).padStart(2,'0')},C=code();
  $('rNo').textContent='레퍼런스 처방전 · No.'+C.split('-')[1];
  $('rDate').textContent=d.getFullYear()+'.'+p(d.getMonth()+1)+'.'+p(d.getDate());
  $('coloLine').textContent='BRAND EYE-FIT · '+C;

  var eq=['<span class="chip">'+secName()+'</span>','<span class="op">×</span>'];
  goalNames().forEach(function(g,i){if(i)eq.push('<span class="op">·</span>');eq.push('<span class="chip">'+g+'</span>')});
  if(sv&&sv.k==='pf')eq.push('<span class="op">·</span>','<span class="chip">'+(S.page?PAGES[S.page].n:'포트폴리오')+'</span>');
  $('rEq').innerHTML=eq.join('');

  /* Output 01 · 결 */
  var v=sharp(), vd=VERD.filter(function(x){return v<=x.max})[0]||VERD[3];
  $('rNum').textContent=v.toFixed(1);
  $('rEye').innerHTML=eyeSVG(v);
  setTimeout(function(){$('rMark').style.left=(v/2*100)+'%'},80);
  $('rVerdict').textContent=vd.t;
  var mn=S.moods.map(function(i){return MOODS[i].n});
  $('rMood').innerHTML=(mn.join(' + ')||'결 미선택')+'<br>'+
    (S.bg>=0?BGS[S.bg][0]:'-')+' / 포인트 '+(S.point>=0?POINTS[S.point][0]:'-')+(S.hexBg?' / '+S.hexBg:'')+(S.hexPt?' + '+S.hexPt:'')+
    '<br><span style="color:var(--muted)">'+vd.s+'</span>';

  /* ＋ 맹점 = 이 결의 반대편 */
  var far=S.touched.slice().sort(function(a,b){return Math.abs(S.axes[b]-3)-Math.abs(S.axes[a]-3)})
    .filter(function(i){return Math.abs(S.axes[i]-3)>0});
  var w=far.slice(0,2).map(function(i){return S.axes[i]<3?AX[i].r:AX[i].l});
  $('rBlind').innerHTML=w.length?'<span class="hl">'+w.join('</span> × <span class="hl">')+'</span>':'<span class="hl">아직 없음</span>';
  $('rBlindD').textContent=w.length
    ? '고르신 결의 정반대입니다. 여기에 경쟁사가 몰려 있으면 대표님 자리가 비어 있는 거구요. ...한 번은 확인해 보세요.'
    : '축을 밀어야 반대편이 보입니다.';

  /* 축별 좌표 · 점 표시 */
  $('rAx').innerHTML=AX.map(function(a,i){
    var val=S.axes[i],dd=Math.abs(val-3);
    var side=val<3?'L':(val>3?'R':'');
    var c=dd===2?'var(--green)':(dd===1?'var(--amber)':'var(--faint)');
    return '<div class="dbar '+side+'"><span class="ln">'+a.l+'</span>'+
      '<span class="dtk">'+(dd?'<s style="left:'+(val<3?((val-1)/4*100):50)+'%;width:'+(dd*25)+'%;background:'+c+'"></s>':'')+
      '<b style="left:'+((val-1)/4*100)+'%;background:'+c+'"></b></span>'+
      '<span class="rn">'+a.r+'</span></div>'}).join('');

  /* Output 02 · 키워드 */
  var q=queries(),h='';
  [['PINTEREST','pinterest','핀터레스트 · 무드를 가장 빨리 봅니다'],
   ['BEHANCE','behance','비핸스 · 프로젝트를 통째로 봅니다'],
   ['ISSUU','issuu','이슈 · 문서를 한 장씩 넘겨봅니다']].forEach(function(x){
    var o=q[x[1]];
    h+='<div class="kw"><div class="kh"><span class="kn">'+x[0]+'</span><span class="kd">'+x[2]+'</span></div>'+
    '<div class="kq">'+o.q+'</div><div class="ka">'+
    '<a href="'+o.u+encodeURIComponent(o.q)+'" target="_blank" rel="noopener">여기서 찾기 ↗</a>'+
    '<button type="button" data-q="'+o.q.replace(/"/g,'&quot;')+'">복사</button></div></div>'});
  $('rSrc').innerHTML=h;
  var bw=w.length?w.join(' × '):'반대편';
  $('dose04').innerHTML='<b>'+bw+'</b> 쪽 컷도 2장 담으세요. 피할 방향이 정해져야 결이 섭니다.';
  $('rSrc').querySelectorAll('button').forEach(function(b){b.onclick=function(){
    navigator.clipboard.writeText(b.dataset.q);var o=b.textContent;b.textContent='복사됨 ✓';
    setTimeout(function(){b.textContent=o},1400)}})}

/* ── 진행 조건 ── */
function ok(n){switch(n){
  case 1:return !!S.sector&&(S.sector!=='etc'||!!S.secEtc); case 2:return S.goals.length>0&&(S.goals.indexOf('getc')<0||!!S.goalEtc); case 3:return !!S.svc;
  case 4:return S.swi>=SWIPE.length; case 5:return S.touched.length>=3;
  case 6:return S.moods.length>0; case 7:return S.bg>=0&&S.point>=0; default:return true}}
function refresh(){
  for(var i=1;i<=7;i++){var b=$('n'+i);if(b)b.disabled=!ok(i)}
  $('h1').textContent=S.sector?'선택됨 — '+secName():'하나만 골라주세요';
  $('h2').textContent=S.goals.length?S.goals.length+'개 선택됨':'최소 하나 골라주세요';
  $('h3').textContent=S.svc?'선택됨'+(S.svc==='pf'&&S.page?' — '+PAGES[S.page].n:''):'하나만 골라주세요';
  $('h4').textContent=Math.min(S.swi,SWIPE.length)+' / '+SWIPE.length;
  $('h5').textContent=S.touched.length+' / 7 축'+(S.touched.length<3?'  (최소 3)':'');
  $('h6').textContent=S.moods.length+' / 2';
  $('h7').textContent=(S.bg>=0?'배경 ✓':'배경')+' · '+(S.point>=0?'포인트 ✓':'포인트')}
[1,2,3,4,5,6,7].forEach(function(i){$('n'+i).onclick=function(){
  if(!ok(i)){if(i===5)talk(TALK.ax3);return}
  if(i===2)checkCombo();
  go(i===7?8:i+1)}});

/* ── 폼 ── */
var PICK={};
['fWho','fStage','fAI'].forEach(function(g){
  document.querySelectorAll('#'+g+' button').forEach(function(b){b.onclick=function(){
    document.querySelectorAll('#'+g+' button').forEach(function(x){x.classList.remove('sel')});
    b.classList.add('sel');PICK[g]=b.dataset.v}})});
$('addLink').onclick=function(){
  var r=document.createElement('div');r.className='linkrow';
  r.innerHTML='<input type="url" class="flink" placeholder="링크 (https://)" /><button class="del" type="button">×</button>';
  r.querySelector('.del').onclick=function(){r.remove()};
  $('linkWrap').appendChild(r);r.querySelector('input').focus()};
$('kko').onclick=function(){window.open(CONTACT.kakao,'_blank','noopener')};
$('fSend').onclick=async function(){
  var v=function(i){return $(i).value.trim()},btn=this,er=$('err'),bad=[];
  document.querySelectorAll('.bad').forEach(function(e){e.classList.remove('bad')});
  var lks=[].slice.call(document.querySelectorAll('.flink'));
  var lk=lks.map(function(e){return e.value.trim()}).filter(Boolean);
  if(!v('fBrand')){bad.push('브랜드명');$('fBrand').classList.add('bad')}
  if(!v('fName')){bad.push('성함');$('fName').classList.add('bad')}
  if(!lk.length){bad.push('브랜드 링크 최소 1개');lks[0].classList.add('bad')}
  if(!v('fEmail')||!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('fEmail'))){bad.push('회신받을 이메일');$('fEmail').classList.add('bad')}
  if(!PICK.fWho)bad.push('이 문서를 누가 받나요');
  if(!PICK.fStage)bad.push('지금 어디까지 와 있나요');
  if(!$('fAgree').checked)bad.push('개인정보 수집 동의');
  if(bad.length){er.textContent='다음을 확인해 주세요 — '+bad.join(', ');er.classList.add('on');
    er.scrollIntoView({behavior:'smooth',block:'center'});return}
  er.classList.remove('on');
  var q=queries(),sec=SECTORS.filter(function(s){return s.k===S.sector})[0];
  var body={access_key:W3F_KEY,subject:'[눈띄고·눈맞춤] '+v('fBrand')+' · '+code(),
    from_name:'눈띄고 눈맞춤',replyto:v('fEmail'),botcheck:$('botcheck').value,
    브랜드명:v('fBrand'),성함:v('fName'),회신이메일:v('fEmail'),브랜드링크:lk.join('\n'),보유자료:v('fBoard')||'-',가이드요청:$('fGuide').checked?'예':'아니오',
    수신자:PICK.fWho,진행단계:PICK.fStage,AI경험:PICK.fAI||'무응답',요청사항:v('fNote')||'-',
    처방전코드:code(),업종:(S.sector==='etc'&&S.secEtc)?S.secEtc:sec.n,결선명도:sharp().toFixed(1),
    목적:goalNames().join(', '),
    쓰임:(SVCS.filter(function(s){return s.k===S.svc})[0]||{}).n,페이지:PAGES[S.page].n,
    결:S.moods.map(function(i){return MOODS[i].n}).join(' + ')||'-',
    컬러:(S.bg>=0?BGS[S.bg][0]:'-')+' / '+(S.point>=0?POINTS[S.point][0]:'-')+(S.hexBg?' / '+S.hexBg:'')+(S.hexPt?' + '+S.hexPt:''),
    축좌표:S.axes.join(','),직접입력:S.free||'-',
    키워드:'PINTEREST '+q.pinterest.q+'\nBEHANCE '+q.behance.q+'\nISSUU '+q.issuu.q};
  btn.disabled=true;btn.textContent='보내는 중…';
  try{
    var r=await fetch('https://api.web3forms.com/submit',{method:'POST',
      headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(body)});
    var j=await r.json(); if(!j.success)throw new Error(j.message||'전송 실패');
    $('formBox').style.display='none';$('doneBox').style.display='block';S.sent=true;save();
    $('doneBox').scrollIntoView({behavior:'smooth',block:'center'});
  }catch(e){ btn.disabled=false;btn.innerHTML='이 결과로 소견 신청하기 &nbsp;&#8594;';
    er.innerHTML='전송에 실패했습니다. ...카카오로 보내주시면 바로 이어갑니다. '+
    '<a href="'+CONTACT.kakao+'" target="_blank" rel="noopener" style="color:var(--green)">카카오로 문의 →</a>';
    er.classList.add('on')}};

/* ── 처방전 텍스트 복사 ── */
$('copy').onclick=function(){
  var q=queries(),sec=SECTORS.filter(function(s){return s.k===S.sector})[0];
  var t='[눈띄고 · 레퍼런스 처방전 '+code()+']\n\n'+
  '검사 대상  '+sec.n+' × '+S.goals.map(function(k){return GOALS.filter(function(g){return g.k===k})[0].n}).join(' · ')+'\n'+
  '결        '+(S.moods.map(function(i){return MOODS[i].n}).join(' + ')||'-')+'  (선명도 '+sharp().toFixed(1)+')\n'+
  '컬러      '+(S.bg>=0?BGS[S.bg][0]:'-')+' / 포인트 '+(S.point>=0?POINTS[S.point][0]:'-')+'\n\n'+
  '키워드\n  PINTEREST  '+q.pinterest.q+'\n  BEHANCE    '+q.behance.q+'\n  ISSUU      '+q.issuu.q+'\n\n'+
  '레퍼런스는 거점이지, 도착지가 아닙니다.\nnunddigo.com  O_o';
  var b=this,o=b.innerHTML;
  navigator.clipboard.writeText(t).then(function(){b.textContent='복사됐습니다 ✓';
    setTimeout(function(){b.innerHTML=o},1600)},function(){b.textContent='복사 실패'})};

/* ── 초기화 ── */
(function(){
  drawSector();drawGoal();drawSvc();drawAxes();drawMood();drawColor();
  var o=load();
  if(o){$('resume').style.display='block';
    $('rsm').onclick=function(){
      for(var k in o)S[k]=o[k];
      drawSector();drawGoal();drawSvc();drawMood();drawColor();
      $('axes').querySelectorAll('input').forEach(function(e,i){e.value=S.axes[i];
        if(S.touched.indexOf(i)>=0)$('ax'+i).classList.add('on')});
      drawSwipe();go(Math.min(o.step,7))}}
  go(0);
})();

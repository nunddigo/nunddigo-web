/* 눈맞춤 데이터 · 7축 = [부드↔딱딱, 동적↔정적, 따뜻↔차가움, 밝음↔어두움, 화려↔담백, 모던↔클래식, 단순↔복잡] */
var AX=[
 {l:"부드러운",r:"딱딱한",  e:"SOFT–HARD"},
 {l:"동적인",  r:"정적인",  e:"DYNAMIC–STATIC"},
 {l:"따뜻한",  r:"차가운",  e:"WARM–COOL"},
 {l:"밝은",    r:"어두운",  e:"LIGHT–DARK"},
 {l:"화려한",  r:"담백한",  e:"DECORATIVE–PLAIN"},
 {l:"모던한",  r:"클래식한",e:"MODERN–CLASSIC"},
 {l:"단순한",  r:"복잡한",  e:"SIMPLE–COMPLEX"}
];
/* 포트폴리오 75건 전수 */
var SB={
"01":[4,5,4,4,5,2,1,"COVILL"],            "02":[3,5,3,2,5,2,2,"LEPEL"],
"03":[5,4,4,3,4,1,3,"newer"],             "04":[3,5,4,4,3,4,3,"BOTTIER"],
"05":[4,3,3,3,3,3,4,"golemeth"],          "06":[3,4,3,2,4,2,3,"슈즈 모바일"],
"07":[3,4,4,4,3,4,3,"CPL"],               "08":[3,4,4,3,3,4,3,"VALLO DE NERA"],
"09":[2,3,2,2,3,3,3,"HAPPY YOGIS"],       "10":[1,2,2,2,3,4,3,"Willo the wisp"],
"11":[2,1,1,1,1,3,3,"Kichica"],           "12":[2,4,1,2,3,5,3,"CHUBBY CHEEKS"],
"13":[1,4,1,2,2,4,4,"Mon reve"],          "14":[1,4,2,1,3,3,3,"Echloe"],
"15":[3,3,4,2,3,2,3,"wavy"],              "16":[2,4,3,3,4,3,3,"revgrit"],
"17":[4,3,4,1,3,1,3,"ONLY NiRO"],         "18":[5,1,4,3,2,1,2,"OUTPUT"],
"19":[1,3,2,1,2,3,3,"J.lily"],            "20":[4,3,4,5,3,3,3,"LVB"],
"21":[1,4,1,2,3,5,3,"OMVIRI"],            "22":[4,5,4,5,5,2,2,"MOOD MARKING"],
"23":[2,4,3,1,4,2,3,"앰플 클리니컬"],       "24":[2,2,2,1,2,2,3,"BE SWEAT"],
"25":[3,1,2,2,1,2,5,"육육걸즈"],           "26":[2,4,2,2,4,3,3,"love f"],
"27":[3,2,2,2,2,3,4,"Really Good Swim"],  "28":[4,2,4,4,3,2,3,"YUWAVE"],
"29":[3,4,2,4,3,5,3,"REMEMBER JANE"],     "30":[3,4,3,1,4,1,3,"AMSquare"],
"31":[4,4,4,2,4,1,3,"Code:graphy"],       "32":[3,3,2,3,2,3,3,"JACKPOD"],
"33":[3,3,3,5,3,4,3,"We are young"],      "34":[2,3,2,1,2,3,3,"LOING"],
"35":[2,5,2,4,4,4,2,"seedlet"],           "36":[4,3,3,2,2,3,3,"OEUVA"],
"37":[4,2,3,4,2,2,4,"BLUE ELEPHANT"],     "38":[4,3,3,5,3,2,3,"Disney 제안서"],
"39":[4,4,4,3,4,1,3,"THECOLDESTMOMENT"],  "40":[2,1,2,1,1,2,4,"MYSTELLA"],
"41":[3,5,3,2,5,4,2,"OWN FEATURE COLOUR"],"42":[2,1,1,1,2,4,3,"Naked Surf Club"],
"43":[5,2,4,4,4,1,3,"MIHAK"],             "44":[1,5,2,2,4,4,2,"LA'KIRA"],
"45":[2,4,2,3,3,3,3,"QISE"],              "46":[1,5,1,2,4,4,2,"BOSBI"],
"47":[3,3,2,3,4,2,3,"LE AREVEY"],         "48":[3,3,3,2,3,4,3,"SLO.ION"],
"49":[3,1,2,2,1,2,5,"MISTERCHILD"],       "50":[4,4,4,2,4,3,2,"LOHNT."],
"51":[1,3,2,1,3,4,3,"Liacity"],           "52":[4,1,2,1,1,2,4,"SCRUFFY"],
"53":[3,4,4,1,4,2,3,"DOCTOR TIPS"],       "54":[3,5,4,4,4,1,2,"YJACK"],
"55":[5,2,4,5,2,1,4,"O.NEST LAB"],        "56":[3,4,3,1,3,3,3,"DE:R28"],
"57":[4,3,5,4,3,2,3,"CURTAIN CALL"],      "58":[2,3,2,2,4,3,3,"theearlymorningair"],
"59":[1,2,1,1,1,2,4,"MIMIC"],             "60":[3,4,3,5,4,2,3,"Miraclenate"],
"61":[4,2,2,2,3,2,3,"Scoupe"],            "62":[1,4,1,1,4,4,2,"azalea"],
"63":[5,1,3,1,1,1,2,"UUUUP"],             "64":[3,2,3,3,3,2,3,"offroad"],
"65":[3,3,3,4,2,3,3,"HBD"],               "66":[4,3,3,3,3,2,3,"Danal"],
"67":[2,5,2,2,4,5,2,"安民"],               "68":[1,5,2,2,4,4,2,"SCENE SCENTS"],
"69":[3,4,3,3,4,3,3,"BELOW & BEYOND"],    "70":[5,4,4,5,4,1,3,"ii STUDIO"],
"71":[3,5,3,1,5,3,1,"MONOCHROME"],        "72":[2,5,2,3,3,5,2,"N.C 향수"],
"73":[3,2,3,2,2,2,3,"JEORNEY"],           "74":[3,4,3,5,3,3,3,"GLOW EVENING CLUB"],
"75":[5,2,4,4,4,1,2,"vadefy"]
};
/* 무드 12 — 같은 7축 좌표를 갖는다 (스코어보드가 상위 개념) */
var MOODS=[
{n:"미니멀·클린", d:"흰 여백 · 얇은 산세", v:[3,5,3,2,5,2,1], pk:"71"},
{n:"콰이어트 럭셔리", d:"아이보리 · 얇은 세리프", v:[2,5,2,2,4,3,2], pk:"41"},
{n:"에디토리얼·매거진", d:"2단 분할 · 캡션", v:[3,4,3,2,4,3,3], pk:"39"},
{n:"무디·시네마틱", d:"짙은 화면 · 강한 한 줄", v:[3,4,3,5,4,3,2], pk:"36"},
{n:"다크 로맨틱", d:"버건디 · 크림 세리프", v:[2,4,2,5,3,4,3], pk:"29"},
{n:"내추럴·어스톤", d:"딥그린 · 얇은 세리프", v:[1,4,1,2,4,4,2], pk:"26"},
{n:"비비드·팝", d:"핑크 · 그린 · 굵은 산세", v:[2,1,1,1,1,2,4], pk:"40"},
{n:"클리니컬·테크", d:"그라데이션 · 산세", v:[4,3,5,1,4,1,2], pk:"30"},
{n:"브루탈리즘·그리드", d:"그레인 · 초굵은 산세", v:[5,2,4,3,3,1,3], pk:"43"},
{n:"로맨틱·소프트", d:"핑크 전면 · 세로 프레임", v:[1,3,2,1,3,4,3], pk:"24"},
{n:"키치·유니크", d:"크림 그리드 · 라운드", v:[3,1,2,2,1,2,5], pk:"11"},
{n:"빈티지·레트로", d:"샌드 · 필름 · 오렌지", v:[2,4,2,3,3,5,3], pk:"42"}
];

/* ═══ 선택지 ═══ */
var SECTORS=[
{k:"fashion",n:"패션",d:"의류·잡화·슈즈",en:"fashion brand"},
{k:"beauty",n:"뷰티",d:"코스메틱·향·바디",en:"beauty skincare brand"},
{k:"life",n:"라이프스타일",d:"리빙·오브제·문구",en:"lifestyle homeware brand"},
{k:"fnb",n:"F&B",d:"카페·베이커리·식품",en:"food beverage brand"},
{k:"space",n:"공간·클래스",d:"스테이·필라테스·공방",en:"hospitality space brand"},
{k:"content",n:"콘텐츠·크리에이터",d:"퍼스널 브랜드·채널",en:"personal brand"},
{k:"tech",n:"IT·테크",d:"앱·솔루션·SaaS",en:"tech saas brand"},
{k:"agency",n:"에이전시·스튜디오",d:"디자인·크리에이티브",en:"creative agency"},
{k:"etc",n:"기타",d:"직접 입력",en:"brand"}];

var GOALS=[
{k:"ipjeom",n:"플랫폼 입점",d:"무신사·29CM·올리브영",w:2,src:"issuu"},
{k:"doyak",n:"급 도약",d:"리브랜딩·다음 단계",w:-1,src:"behance"},
{k:"jeonhwan",n:"매출 전환",d:"자사몰이 팔리게",w:0,src:"pinterest"},
{k:"fandom",n:"팬덤·인지",d:"알려지고 기억되게",w:-3,src:"pinterest"},
{k:"popup",n:"팝업·오프라인",d:"공간에서 만나게",w:-2,src:"behance"},
{k:"invest",n:"투자·제휴",d:"IR·B2B 신뢰",w:3,src:"behance"},
{k:"global",n:"해외 진출",d:"바깥 시장에서 띄게",w:1,src:"issuu"},
{k:"getc",n:"기타",d:"직접 입력",w:0,src:"pinterest"}];

var SVCS=[
{k:"pf",n:"브랜드 포트폴리오",d:"소개서 · 제안서",en:"brand deck"},
{k:"none",n:"아직 안 정했어요",d:"무드만 잡을게요",en:""}];
var LOCKS=[{n:"웹사이트",d:"곧 열립니다"},{n:"상세페이지",d:"곧 열립니다"},
{n:"소셜미디어",d:"곧 열립니다"},{n:"브랜드 아카이브",d:"곧 열립니다"}];

var PAGES=[
{n:"전체",en:"",q:""},
{n:"표지",en:"deck cover design",q:"3초 안에 뭐 하는 브랜드인지 보이는가?"},
{n:"목차",en:"contents page layout",q:"읽는 순서를 우리가 정했는가?"},
{n:"브랜드 스토리",en:"brand story spread",q:"왜 이 브랜드가 있어야 하는가?"},
{n:"컨셉·비전",en:"brand concept board",q:"무엇을 지향하는가, 한 문장으로?"},
{n:"제품 라인업",en:"product lineup layout",q:"무엇을 파는지 한눈에 잡히는가?"},
{n:"룩북·비주얼",en:"lookbook spread",q:"우리 결이 사진 한 장에 들어 있는가?"},
{n:"성과·증빙",en:"data infographic slide",q:"왜 믿어야 하는가?"},
{n:"마무리·컨택",en:"closing slide design",q:"다음에 뭘 하라는 건가?"}];

var MOOD_EN=["minimal clean","quiet luxury","editorial magazine","moody cinematic","dark romantic",
"natural earth tone","vivid pop","clinical tech","brutalist grid","soft romantic","kitsch playful","vintage retro"];

var BGS=[["화이트","#FFFFFF","white"],["아이보리","#EDE7DA","ivory"],["베이지","#D9CDBA","beige"],
["웜그레이","#BDB6AC","warm grey"],["라이트그레이","#E4E4E2","light grey"],["블랙·차콜","#1A1817","black"],
["딥네이비","#1B2A44","deep navy"],["딥그린","#1F3226","deep green"],["딥브라운","#3A2A20","deep brown"],
["딥버건디","#3B1620","deep burgundy"]];
var POINTS=[["없음","","monochrome only"],["레드","#DA3A33","red accent"],["오렌지","#F0611F","orange accent"],
["옐로우","#F2C230","yellow accent"],["라임","#C6E24B","lime accent"],["네온그린","#7CC24A","neon green accent"],
["그린","#2E6B45","green accent"],["민트","#7ED3C0","mint accent"],["블루","#2C5FD0","blue accent"],
["라벤더","#A99BE0","lavender accent"],["퍼플","#5B21B6","purple accent"],["핑크","#E0357F","pink accent"],
["코랄","#F2795E","coral accent"],["버건디","#7A1F31","burgundy accent"],["골드","#C9A24A","gold accent"],
["실버·크롬","#B9BDC2","chrome silver"]];

/* 직접 입력 → 무드 매칭 */
var KEYMAP={"무드있는":3,"영화같은":3,"시네마틱":3,"분위기있는":3,"그윽한":3,"잔잔한":3,
"몽환":4,"청량":7,"러프":8,"고급":1,"깔끔":0,"에테리얼":4,"관능":4,"은밀한":4,"퇴폐":4,"밤":4,
"자연스러운":5,"흙":5,"편안한":5,"한방":5,"전통":5,"한국적":5,"스파":5,"웰니스":5,"담백":5,
"화려한":6,"알록달록":6,"톡톡":6,"발랄":6,"에너지":6,"컬러풀":6,
"깔끔":0,"심플":0,"단정":0,"여백":0,"정갈":0,"미니멀":0,
"청량":7,"워터리":7,"시원":7,"차가운":7,"Y2K":7,"크롬":7,"미래":7,"하이테크":7,
"고급":1,"럭셔리":1,"우아":1,"절제":1,"품격":1,"하이엔드":1,
"강한":8,"러프":8,"스트리트":8,"힙한":8,"각진":8,"굵은":8,"실험적":8,
"부드러운":9,"사랑스러운":9,"러블리":9,"소녀":9,"파스텔":9,"포근":9,"글로우":9,
"잡지같은":2,"화보":2,"편집":2,"감각적인":2,"세련된":2,
"키치":10,"독특":10,"개성":10,"튀는":10,"재밌는":10,"유쾌":10,
"빈티지":11,"레트로":11,"옛날":11,"클래식":11,"아날로그":11,"세월":11};

/* 되받아치기 */
var TALK={
 mood3:"세 개를 고르면, 하나도 못 고른 겁니다.",
 axmid:"전부 가운데면, 아무 데도 아닙니다. 한 축이라도 밀어보세요.",
 ax3:"세 개만 밀어보세요. 그래야 결이 잡힙니다.",
 pointnone:"포인트를 안 쓰는 것도 답입니다. 절제가 급을 만드니까요.",
 page4:"페이지 넷을 한 번에 잡으면, 결이 넷으로 갈립니다.",
 gapwarn:"여기가 비어 있습니다. ...다만 아무도 안 해봤거나, 해보고 접었거나 둘 중 하나구요. 어느 쪽일까요?"
};
var COMBO=[
 {m:[1],c:[6],t:"럭셔리는 절제로 증명됩니다. ...색을 더할수록 급은 내려가구요. 둘 중 하나, 버리실 수 있나요?"},
 {g:"ipjeom",m:[10],t:"MD는 3초 봅니다. 키치는 기억엔 남는데, 신뢰엔 안 남구요. 표지만 키치, 라인업은 정직하게. 이 방법은 어떠세요?"},
 {g:"invest",noPage:7,t:"투자자는 감성으로 안 움직입니다. ...숫자가 들어갈 페이지, 정말 없어도 될까요?"},
 {g:"global",t:"바깥에선 한글이 뜻이 아니라 그림으로 읽힙니다. 형태로 골라야 하는데, 지금 고르신 건 어느 쪽인가요?"}];

/* 상품 스펙트럼 판정 */
var SPEC=[
 {t:"감각 쪽입니다",q:"정성적이고 감각적인 비주얼로 눈에 띄게.",tag:"#범용 #대외용 #초기브랜드"},
 {t:"감각에 가깝습니다",q:"정성적이고 감각적인 비주얼로 눈에 띄게.",tag:"#범용 #대외용"},
 {t:"가운데입니다",q:"둘 다 필요한 단계입니다. 대부분의 브랜드가 여기 있습니다.",tag:"#소개서+제안서"},
 {t:"설득에 가깝습니다",q:"정량적이고 설득적인 스토리로 날카롭게.",tag:"#맞춤형 #타겟"},
 {t:"설득 쪽입니다",q:"정량적이고 설득적인 스토리로 날카롭게.",tag:"#맞춤형 #타겟 #성장브랜드"}];
var GOALLINE={ipjeom:"MD는 3초 봅니다. 라인업 구색부터 잡으셔야 합니다.",
 doyak:"급을 올리는 건 더하는 게 아니라 덜어내는 쪽입니다.",
 jeonhwan:"파는 화면은 예쁜 화면과 다릅니다. 다음 행동이 보여야 하구요.",
 fandom:"기억되려면 두 번 보게 만들어야 합니다. 남들과 같으면 한 번도 안 봅니다.",
 popup:"공간은 사진으로 먼저 옵니다. 룩북이 곧 초대장이구요.",
 invest:"투자자는 감성으로 안 움직입니다. 숫자가 들어갈 자리부터 잡으셔야 합니다.",
 global:"바깥에선 한글이 그림으로 읽힙니다. 형태로 고르셔야 합니다."};

/* ═══ 무드 스와치 ═══ */
var SW=[
{bg:"#FFFFFF",el:'<div style="left:10%;top:30%;font-size:17px;font-weight:200;color:#111;letter-spacing:.04em">Aa 가</div>'+
 '<div style="left:10%;top:52%;width:44%;height:1.5px;background:#111;opacity:.22"></div>'+
 '<div style="left:10%;top:59%;width:28%;height:1.5px;background:#111;opacity:.22"></div>'},
{bg:"#EDE7DA",el:'<div style="left:0;right:0;top:32%;text-align:center;font-family:Georgia,serif;font-size:19px;font-weight:400;color:#2B2723">Aa 가</div>'+
 '<div style="left:38%;top:55%;width:24%;height:1px;background:#2B2723;opacity:.4"></div>'},
{bg:"#FFFFFF",el:'<div style="left:0;top:0;bottom:0;width:42%;background:#2A2724"></div>'+
 '<div style="left:48%;top:22%;font-family:Georgia,serif;font-size:18px;color:#111">Aa 가</div>'+
 '<div style="left:48%;top:46%;width:40%;height:1.5px;background:#111;opacity:.28"></div>'+
 '<div style="left:48%;top:53%;width:46%;height:1.5px;background:#111;opacity:.28"></div>'+
 '<div style="left:48%;top:60%;width:26%;height:1.5px;background:#111;opacity:.28"></div>'},
{bg:"#141210",el:'<div style="left:0;right:0;top:36%;text-align:center;font-family:Georgia,serif;font-size:21px;color:#E9E4DA;letter-spacing:.03em">Aa 가</div>'+
 '<div style="left:36%;top:60%;width:28%;height:1px;background:#E9E4DA;opacity:.35"></div>'},
{bg:"#3B1620",el:'<div style="left:0;right:0;top:34%;text-align:center;font-family:Georgia,serif;font-size:20px;color:#EFE3CE;letter-spacing:.08em">Aa 가</div>'+
 '<div style="left:32%;top:58%;width:36%;height:1px;background:#EFE3CE;opacity:.45"></div>'},
{bg:"#1F3226",el:'<div style="left:0;right:0;top:34%;text-align:center;font-family:Georgia,serif;font-size:19px;font-weight:300;color:#E4E7DC">Aa 가</div>'+
 '<div style="left:34%;top:57%;width:32%;height:1px;background:#E4E7DC;opacity:.4"></div>'},
{bg:"#F5CBD8",el:'<div style="left:8%;top:12%;width:30%;height:30%;border-radius:50%;background:#7CC24A"></div>'+
 '<div style="left:8%;top:50%;font-size:22px;font-weight:800;color:#E0357F;letter-spacing:-.04em">Aa 가</div>'+
 '<div style="right:9%;bottom:14%;width:20%;height:20%;border-radius:5px;background:#7CC24A"></div>'},
{bg:"linear-gradient(125deg,#DCEFF6,#E7E2F7 45%,#C9DBF5)",
 el:'<div style="left:10%;top:34%;font-size:16px;font-weight:500;color:#20408A;letter-spacing:.03em">Aa 가</div>'+
 '<div style="left:10%;top:55%;width:38%;height:1.5px;background:#20408A;opacity:.3"></div>'+
 '<div style="right:10%;top:16%;width:16%;height:16%;border-radius:50%;background:#20408A;opacity:.25"></div>'},
{bg:"#E4E4E2",el:'<div class="grain" style="opacity:.55"></div>'+
 '<div style="left:0;top:0;width:48%;height:38%;background:#111"></div>'+
 '<div style="left:6%;top:46%;font-size:25px;font-weight:900;color:#111;letter-spacing:-.07em">Aa 가</div>'+
 '<div style="right:0;bottom:0;width:34%;height:26%;background:#111"></div>'},
{bg:"#F2A8C0",el:'<div style="left:12%;top:9%;right:12%;bottom:9%;border:1.5px solid rgba(255,255,255,.85)"></div>'+
 '<div style="left:0;right:0;top:38%;text-align:center;font-family:Georgia,serif;font-size:19px;font-weight:300;color:#FFF">Aa 가</div>'},
{bg:"#F4EFE2",el:'<div style="left:0;right:0;top:0;bottom:0;background-image:linear-gradient(#D9CFB4 1px,transparent 1px),linear-gradient(90deg,#D9CFB4 1px,transparent 1px);background-size:14px 14px;opacity:.8"></div>'+
 '<div style="left:0;right:0;top:34%;text-align:center;font-size:23px;font-weight:800;color:#EE8A1E;letter-spacing:-.02em">Aa 가</div>'+
 '<div style="right:12%;top:14%;width:11%;height:11%;background:#EE8A1E;border-radius:50%"></div>'},
{bg:"#E8D9BC",el:'<div class="grain" style="opacity:.5"></div>'+
 '<div style="left:0;right:0;top:34%;text-align:center;font-family:Georgia,serif;font-size:20px;font-weight:600;color:#D9791F;letter-spacing:.02em">Aa 가</div>'+
 '<div style="left:34%;top:58%;width:32%;height:1px;background:#D9791F;opacity:.55"></div>'}];

/* ═══ 스와이프 카드 12 · 7차원 공간 균등 분포 (greedy max-min) ═══ */
var SWIPE=["63","46","70","59","30","33","10","36","71","55","01","16"];

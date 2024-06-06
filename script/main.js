// logo slide =================================================================================
const logo = document.querySelector('.logo_ul');
const logoList = document.querySelectorAll('.logo_ul li');
const logoWidth = 220;
let logoCnt = 0;
let currentLogo = 0;

const logoSlide = () => {
  logo.classList.add('animated');
  currentLogo = logoWidth * logoCnt; // 0 > 220 > 440 ...
  logo.style.left = -(currentLogo) + 'px';      
  // console.log(`${currentLogo} = ${logoWidth} * ${logoCnt}`);
  logoCnt++;
  
  if(logoCnt == logoList.length+1){
    logoCnt = 0;
    logo.classList.remove('animated');
    logo.style.left = logoCnt + 'px';
  }
}
setInterval(logoSlide, 5000);

// popular slide ==============================================================================
const popDiv = document.querySelector('.popular_s');
const popUl = document.querySelector('.popular_s_ul');
const popLi = document.querySelectorAll('.popular_s_ul li');
const popHeight = 30.5; // 각 리스트의 높이
const popUlTop = popUl.getBoundingClientRect().top; //getBoundingClientRect() : 절대 위치를 구할 수 있다. | 해당 함수로 부모 기준의 상대적 위치를 구할 수 있다.
let perPopTop = 0; // 각 리스트의 높이를 저장
let currentPop = 0; // 현재 높이값
let popCnt = 0; // 리스트의 갯수와 같아지면 초기화
let calcPop = 0; // 계산된 높이값

const popPosi = () => {
  for(let i=0;i<popLi.length;i++){
    calcPop = popHeight * i;
    popLi[i].style.top = calcPop + 'px';
  }
};
popPosi(); // 초기 값을 잡아주지 않으면 list가 전부 position 0으로 잡히기 때문에, 초기값을 잡아주는 함수를 만들어준다.

const popSlide = () => { // 각 리스트의 높이 값 구하기
  if(popCnt == popLi.length){ // 초기화 하고 재정비
    popCnt = 0;
    for(let i=0;i<popLi.length;i++){
      popLi[i].style.transition = '';
      popLi[i].style.top = popHeight * i + 'px';
    }
  }
  for(let i=0;i<popLi.length;i++){
    popLi[i].style.transition = '0.5s ease';
    perPopTop = popLi[i].getBoundingClientRect().top;
    // 계산된 높이 값 = 각 리스트의 top값 - 부모의 top값 - 리스트의 높이값
    // 각 리스트의 top 절대 값 - 부모의 top 절대 값 : 각 리스트의 부모로부터의 상대적 위치값
    // - 리스트의 높이 값 : top을 리스트의 높이값 만큼 올려주기 위해 음수 처리
    calcPop = (perPopTop - popUlTop) - (popHeight) + 'px';
    popLi[i].style.top = calcPop;
  }
  popCnt++;
};
setInterval(popSlide, 3000);

const popHover = () => {
  popDiv.addEventListener('mouseenter', ()=>{
    document.querySelector('.popular_s h2').style.color = '#009C75';
    document.querySelector('.pop_menu').classList.add('on');
  });
  popDiv.addEventListener('mouseleave', ()=>{
    document.querySelector('.popular_s h2').style.color = '#8a8f8e';
    document.querySelector('.pop_menu').classList.remove('on');
  });
};
popHover();

// HERE =====================================================================================================================
// here selected ===================
const selectedHereMenu = document.querySelectorAll('.here_left span');
const onHereBox = document.querySelectorAll('.here_right_box');

// 초기화 함수
function initializeFeature(){
  const activeHereSlide = document.querySelector('.here .here_right_box.on');
  // console.log(activeHereSlide);
  if (activeHereSlide){ // querysellector로 찾는 값이 존재하면, 발동
    addDragEventListeners(activeHereSlide)
  }
}

// 클릭할 버튼에 forEach와 addEvantListner
selectedHereMenu.forEach((span, index)=> {
  span.addEventListener('click', ()=>{
    console.log('클래스 지우고, 새로 추가하기');
    for(let i=0;i<selectedHereMenu.length;i++){
      selectedHereMenu[i].className = '';
      onHereBox[i].classList.remove('on');
    }
    span.className = 'selected';
    onHereBox[index].classList.add('on');

    // // 클릭 이벤트 발생 시 .on 요소 재탐색
    // // 전역변수로 저장 한번만 할 시, 첫번째 box에만 slide가 적용되기 때문임 (조건을 만족하는 첫번째, 한 가지의 구조를 가져와서 변함이 없기 때문)
    // let updatedDragHereSlide = document.querySelector('.here .here_right_box.on');
    // // 새롭게 탐색된 요소에 드래그 이벤트 리스터 추가
    // addDragEventListeners(updatedDragHereSlide);
    // 위의 코드를 함수로 묶어 페이지가 리로드 될때, 클릭이벤트가 생길때 두 상황에서 함수를 발동
    // 현재는 클릭이벤트가 생길 때
    initializeFeature();

  });
});

// here drag ================
let startPoint = 0;
let isMouseDown = false;
// const dragHereSlide = document.querySelector('.here .here_right_box.on');
let scrollLefts = 0;

// 함수를 사용하여 각 슬라이드에 이벤트 리스너 추가
function addDragEventListeners(dragHereSlide) {
// 마우스를 눌렀을 때 실행
  dragHereSlide.addEventListener('mousedown', (e)=>{
    isMouseDown = true;
    dragHereSlide.classList.add('active');
    startPoint = e.pageX - dragHereSlide.offsetLeft;
    scrollLefts = dragHereSlide.scrollLeft; 
  });
  // 마우스를 뗐을 때 실행
  dragHereSlide.addEventListener('mouseup', ()=>{
    isMouseDown = false;
    dragHereSlide.classList.remove('active');
  });
  // 마우스가 떠났을 때 실행
  dragHereSlide.addEventListener('mouseleave',()=>{
    isMouseDown = false;
    dragHereSlide.classList.remove('active');
  });
  // 마우스가 움직일때 추적
  dragHereSlide.addEventListener('mousemove', (e)=>{
    if(!isMouseDown) return;
    e.preventDefault();
    const x =  e.pageX - dragHereSlide.offsetLeft;
    const move = (x - startPoint)*1;
    dragHereSlide.scrollLeft = scrollLefts - move;
  });
};

// 페이지 로드시, queryselector 조건에 맞는 값을 가져온다.
initializeFeature();
// ================================= End here drag ===========================================
// bets5 hover ===============================================================================
const bestTh = document.querySelectorAll('.best_container .best_th');
const thCont = document.querySelectorAll('.best_container .th_cont');
const cardHover = document.querySelectorAll('.best_container .card_hover');

// let hoverId = null;
bestTh.forEach((item, index) => {
  // 인덱스 값을 구해와서 특정 div를 hover했을때 특정 div만 발동하도록
  item.addEventListener('mouseenter', () => {
    // console.log(`enter${index}`)
    // hover전
    const beforeHover = item.childNodes[3].style;
    // console.log(before);
    beforeHover.zIndex = '-1';
    // hover중
    const afterHover = item.childNodes[5].style;
    afterHover.zIndex = '1';
    afterHover.transition = '0.2s ease';
  });
  // 마우스를 치웠을 때 다시 원래대로 돌아오도록
  item.addEventListener('mouseleave', () => {
    const beforeHover = item.childNodes[3].style;
    beforeHover.zIndex = '1';

    const afterHover = item.childNodes[5].style;
    afterHover.zIndex = '-1';
    afterHover.transition = '0.2s ease';
  });
});
// ===================================== End best5 hover =====================================
// reco2 drag slide===========================================================================
// 웹(PC) : mousedown|mouseup(드래그) / 모바일 : touchstart|touchend(스와이프)
// 코드는 똑같이 짜도 되지만, 명령어가 다르기 때문에 각각 addEventListner를 사용해야 함.
// let startPoint = 0; // (위에 변수에 담아놨으므로 주석처리)
// let endPoint = 0;
// 드래그 중인지 아닌지 판별할 값 (위에 변수에 담아놨으므로 주석처리)
// let isMouseDown = false;

// 웹(PC)
const dragSlide = document.querySelector('.reco2 .card_li');

// 이또한 pangenation 할때 쓰는게 좋을 것 같아서 주석처리
// 슬라이드 전체 크기(clientWidth : 보더, 마진 불포함) | style로 불러오는것이 X
// style 속성을 통해 접근하면 인라인 스타일로 설정된 속성값만 가져올 수 있으며, 대부분의 경우 원하는 값이 없어 undefined를 반환한다.
// let dragSlideWidth = dragSlide.clientWidth;

// 전역변수로 놓고 값을 바꿔준다. 참고로 부모요소가 스크롤이 가능한 상태여야 scrollLest값을 받아올 수 있다.
// 즉, 부모보다 자식이 커야 함.
// let scrollLefts = 0; // (위에 변수에 담아놨으므로 주석처리)

// 마우스를 눌렀을 때 실행
dragSlide.addEventListener('mousedown', (e)=>{
  isMouseDown = true;
  dragSlide.classList.add('active');

  //------------------아래의 코드는, 슬라이드를 작은 픽셀단위로 옮기는 것이 아닌, paging을 넘길때 사용하는 것이 용이해 보임
  // .pageX() : 문서 왼쪽 가장자리에서 가로 위치를 픽셀단위로 반환
  // console.log('mousedown', e.pageX);
  // 처음 클릭한 위치값 저장
  // console.log(`${e.pageX} - ${dragSlide.offsetLeft}`);
  // console.log(e.pageX - dragSlide.offsetLeft);
  //--------------------------------------------------------------

  // offsetLeft 해당 부모(relative)요소에서 왼쪽기준 얼마나 떨어져있는지 값을 반환
  // > 여기서는 margin: 0 auto; 이므로, 창의 크기에 따라 달라지는 마진값을 그대로 받는다.
  // 즉, 순수한 내부 위치를 left(X축)기준 정확히 알 수 있다.
  // console.log(dragSlide.offsetLeft);
  startPoint = e.pageX - dragSlide.offsetLeft;

  // 마우스가 이동한 만큼의 scrollLeft(px)값이 들어감.
  scrollLefts = dragSlide.scrollLeft; 
  // console.log(`${scrollLefts} = ${dragSlide.scrollLeft}`)
  // return scrollLefts
});
// 마우스를 뗐을 때 실행
dragSlide.addEventListener('mouseup', ()=>{
  // console.log('mouseup', e.pageX);
  // 클릭을 놓기 전 마지막 위치값 저장
  // endPoint = e.pageX;
  isMouseDown = false;
  // 이벤트 옆에 인자값을 넣으면, 이벤트 객체로 들어오는것이기 때문에 classList 속성이 없다.
  // 그러므로 dragSlide를 그대로 넣어주자.
  dragSlide.classList.remove('active');
});
// 마우스가 떠났을 때 실행
dragSlide.addEventListener('mouseleave',()=>{
  isMouseDown = false;
  dragSlide.classList.remove('active');
});
// 마우스가 움직일때 추적
dragSlide.addEventListener('mousemove', (e)=>{
  // isMouseDown이 활성화 되어있지 않으면 바로 구문 빠져나가기
  if(!isMouseDown) return;
  // 기본동작을 방지하여 드래그할때 불편함이 없도록 한다.
  // ex. 드래그할때 클릭되어있는 링크가 클릭을 해제할때 실행되지 않도록 하는 듯.
  e.preventDefault();

  // 마우스가 움직이는 좌표의 순수값
  const x =  e.pageX - dragSlide.offsetLeft;

  // 스크롤로 전환되는 비율을 바꾸고 싶을시, 1을 바꾸면 된다.
  // 마우스가 계속 움직이는 좌표 - 클릭을 처음한 좌표(startPoint)
  const move = (x - startPoint)*1;
  // 최종 위치 = (스크롤 좌표) - (마우스가 움직인 좌표)
  // 최종위치 : scrollLeft는 결정적으로 음수값을 받지않아 음수값을 받으면 0이된다. | 최대 크기(너비)이상의 초과 값도 안 받는다.
  // 스크롤 좌표 : 너비만큼만 0~maxWidth (무조건 양수) 
  // 예시) 마우스가 움직인 좌표 : 왼쪽 드래그/오른쪽 컨텐츠가 드러남/결정적으로 왼쪽 좌표로 마우스가 이동했으므로 음수
  // 예시) 마우스가 움직인 좌표 : 오른쪽 드래그/왼쪽 컨텐츠가 드러남/결정적으로 오른쪽 좌표로 마우스가 이동했으므로 양수
  // console.log(`${dragSlide.scrollLeft} = ${scrollLefts} - ${move}`)
  dragSlide.scrollLeft = scrollLefts - move;
});

// =================================== End reco5 drag slide =======================================
// pli slides =====================================================================================
const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slides li');
const slideCnt = slide.length;
let currentIdx = 0;

// 애니메이팅 도중 중복 입력되지 않도록 변수 만들기
let isAnimating = false;

const slideWidth = 720;
const slideMargin = 96;

// 버튼
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// makeClone의 리턴값을 받으며 자동으로 실행되므로 주석처리
makeClone()

// slide 를 복제하여 자연스럽게 넘길 수 있도록
function makeClone() {
  // 중앙 정렬 값 (즉 기본으로 clone이 lenght 개수만큼 생긴 너비를 생각해서 clone의 원본 위치를 잡아줌)
  // 2배의 클론을 앞에 미리 삽인해놓을 것이기 때문에 *2
  let baseLocation = -((slideCnt*2) * (slideWidth+slideMargin));
  slides.style.left = baseLocation + 'px';
  for (let i = 0; i < slideCnt; i++) {
    // slide요소를 그대로 복사
    // slide.cloneNode()
    // slide요소에 자식요소까지 모두 복사
    // slide.cloneNode(true)

    // 앞에 clone 추가
    let cnt = slideCnt - 1
    // 순서대로 들어가면 거꾸로 clone이 추가되는 것을 방지
    let cloneSlideFirst = slide[cnt - i].cloneNode(true);
    cloneSlideFirst.classList.add('clone');
    slides.prepend(cloneSlideFirst);

    // 뒤에 clone 추가
    let cloneSlideLast = slide[i].cloneNode(true);
    cloneSlideLast.classList.add('clone');
    slides.appendChild(cloneSlideLast);
  }
  return baseLocation;
};
// makecClone에서 return된 값을 변수에 저장
let baseLocation = makeClone()

// 버튼을 눌러 이동할 값 계산
let slideMove = (slideWidth + slideMargin)

// 버틘
prevBtn.addEventListener('click', () => {
  // console.log(`애니메이팅 중 : ${isAnimating}`)
  if (isAnimating) return; // isAnimating이 true면 빠져나오기
  isAnimating = true;

  currentIdx++;
  slides.style.left = baseLocation + (slideMove*currentIdx) + 'px';
  slides.classList.add('animated');
  
  // console.log(`${Math.abs(currentIdx)} : ${slideCnt}`);
  returnLocation()
  // prevMoreClone(slideMove)
});
nextBtn.addEventListener('click', () => {
  if (isAnimating) return;
  isAnimating = true;

  currentIdx--;
  slides.style.left = baseLocation + (slideMove*currentIdx) + 'px';
  slides.classList.add('animated');
  // console.log(`${Math.abs(currentIdx)} : ${slideCnt}`);
  returnLocation()
  // nextMoreClone()
});

// 인덱스가 조건을 달성하면 원래의 자리로 돌아가는 함수
function returnLocation() {
  // setTimeout() : js 내장 함수, 지전된 함수나 코드를 일정시간 이후로 실행되도록 만든다.
  // 해당 속성을 이용하여 애니메이팅을 씹지 않고 끝날때 까지 함수가 발동하지 않도록 걸어준다.
  setTimeout(()=>{
    isAnimating = false;
  }, 1500);
  // 현재 인덱스 == (슬라이드 개수)가 같으면 원래자리로.
  if (Math.abs(currentIdx) == (slideCnt)) {
    // console.log('원래대로')
    setTimeout(function () {
      slides.classList.remove('animated');
      slides.style.left = baseLocation + 'px';
      currentIdx = 0;
    }, 1500); // transition 시간만큼 잡아주면 자연스럽게 돌아가는 것 처럼 보인다.
    // 단, 연속해서 버튼을 누를경우, 재빠르게 연속실행이 되어 부자연스러워 보인다.
    // 애니메이션의 시간이 끝날때까지 버튼을 눌러도 작동하지 않도록 할 수 있는 방법을 찾아보자.
  };
};


// // 버리는 함수 | 이유: clone을 li[0] 앞에 무한 생성해도, clone을 맨 앞에 추가만 하는 것이지, 시작 location이 더 늘어나는 건 아니다.
// // 즉, clone이 들어간 인덱스나, clone이 들어가지 않은 인덱스나 시작 값이 같아서 넣어도 의미가 없다.
// function prevMoreClone(slideMove){
//   // console.log(`${Math.abs(currentIdx)} == ${slideCnt}`);
//   if(currentIdx>0 && (currentIdx%5)==0){// prev 버튼을 눌러서 조건이 만족한 경우
//     console.log('이전버튼 클론 함수 실행');
//     // 앞 클론을 생성 | removeChild를 사용하면 클론을 삭제할 수 있다고 함.
//     for (let i = 0; i < slideCnt; i++) {
//       // const prependClone = slides.querySelectorAll('.clone');
//       let cnt = slideCnt - 1;
//       let cloneSlideFirst = slide[cnt - i].cloneNode(true);
//       cloneSlideFirst.classList.add('clone');
      
//       slides.prepend(cloneSlideFirst);
//       // console.log(cloneSlideFirst); // 앞에 클론이 생성되면서 slide가 뒤로밀려 위치 이동에 의미가 없어짐.
//     }
//     // let currentLeft = (slides.style.left).replace('px', '')
//     // console.log(`현재 위치 : ${currentLeft} | 5개의 너비 : ${baseLocation}`)
//     // slides.style.left = (currentLeft - Math.abs(baseLocation)) + 'px';
//     slides.classList.remove('animated');
//     slides.style.left = 0 + 'px';

//   }
// };

// // prepend 보다는 자연스러우나, 끊임없이 늘어나는 clone은 사이트를 저해시킬 수 있다.
// function nextMoreClone() {
//   if (currentIdx < 0 && (currentIdx % 5) == 0) { // next 버튼을 눌러서 조건이 만족한 경우
//     console.log('다음버튼 클론 함수 실행');
//     // 뒷 클론을 생성하기
//     for (let i = 0; i < slideCnt; i++) {
//       let cloneSlideLast = slide[i].cloneNode(true);
//       cloneSlideLast.classList.add('clone');
//       slides.appendChild(cloneSlideLast);
//     }
//   }
// };
//=============================================End pli slide============================================
//scrollUp==============================================================================================
function scrollTop(){
  // window : 해당 객체는 브라우저 창을 대표, 브라우저 탭 하나하나가 window를 가지고 있음|전역 js 객체|document객체를 포함하고 있음
  // document : 웹페이지 자체를 대표. window.document 를 통해서도 접근 가능
  window.scrollTo({
    // top:0; 까지
    top: 0,
    // 부드럽게 이동
    behavior: 'smooth'
  });
};

// console.log(document.body);
// 스크롤 위치에 따라 버튼의 표시 여부 결정
function toggleScrollBtn(){
  const scrollUpBtn = document.querySelector('.scroll_up');
  // scrollLeft와 마찬가지로 scrollTop도 px 단위
  if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
    scrollUpBtn.style.display = 'block';
  }else{
    scrollUpBtn.style.display = 'none';
  }
};

window.onscroll = function(){
  toggleScrollBtn();
};

document.getElementById('scroll_up').addEventListener('click', scrollTop);
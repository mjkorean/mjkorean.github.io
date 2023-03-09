(function () {
  // 텍스트를 작성할 span 요소 노드 가져오기
  const spanEl = document.querySelector("main h2 span");

  // 작성할 문장을 배열로 정의해 txtArr 변수에 할당(화면에 표시할 문장 배열)
  const txtArr = [
    "a STRONG-WILLED PERSON.",
    "BUT ALSO",
    "a FRONT-END DEVELOPER.",
    "WHAT'S MORE?",
    "BULLDOZER-LIKE.",
    "READY TO GO!",
  ];

  // 인덱스 초깃값도 index 변수에 할당해 배열의 첫번째 요소에 접근히게 함(배열의 인덱스 초깃값)
  let index = 0;

  // 화면에 표시할 문장 배열에서 요소를 하나 가져온 뒤, 배열로 만들기
  let currentTxt = txtArr[index].split("");

  // 텍스트 입력 효과 구현
  // 텍스트가 입력되는 효과의 핵심은 currentTxt 변수에 할당된 배열 요소를 앞에서부터 한 개씩 출력하는 것입니다.
  // 그러면 마치 텍스트가 한 글자씩 작성되는 것처럼 보이게 됩니다.
  // 이를 위해 다음처럼 writeTxt() 함수를 만들어 배열 요소를 한 개씩 출력하게 합니다.
  function writeTxt() {
    spanEl.textContent += currentTxt.shift();
    if (currentTxt.length != 0) {
      setTimeout(writeTxt, Math.floor(Math.random() * 100));
    } else {
      currentTxt = spanEl.textContent.split("");
      setTimeout(deleteTxt, 2500);
    }
  }

  // 텍스트 삭제 효과 구현
  // 텍스트 삭제는 입력 과정과 비슷
  // 텍스트를 입력할 때는 배열의 앞에서부터 요소를 추출해 한 글자씩 출력,
  // 텍스트를 삭제할 때는 뒤에서부터 요소를 추출해 한 글자씩 줄어드는 것처럼 표현
  function deleteTxt() {
    currentTxt.pop();
    spanEl.textContent = currentTxt.join("");
    if (currentTxt.length != 0) {
      setTimeout(deleteTxt, Math.floor(Math.random() * 100));
    } else {
      index = (index + 1) % txtArr.length;
      currentTxt = txtArr[index].split("");
      console.log(currentTxt);
      writeTxt();
    }
  }
  writeTxt();
})();

// 헤더 영역 수직 스크롤 이벤트 설정
// 웹 브라우저의 수직 스크롤 위치는 window 객체의 pageYOffset 속성으로 참조 가능
// 속성값이 0보다 크면 스크롤됐다고 판단하여 이를 조건으로 처리해 if문으로
// active 클래스를 추가하거나 삭제 가능
const headerEl = document.querySelector("header");
window.addEventListener("scroll", function () {
  requestAnimationFrame(scrollCheck);
});
function scrollCheck() {
  let browserScrollY = window.scrollY ? window.scrollY : window.pageXOffset;
  if (browserScrollY > 0) {
    headerEl.classList.add("active");
  } else {
    headerEl.classList.remove("active");
  }
}

/* 애니메이션 스크롤 이동 */
const animationMove = function (selector) {
  // ① selector 매개변수로 이동할 대상 요소 노드 가져오기
  const targetEl = document.querySelector(selector);
  // ② 현재 웹 브라우저의 스크롤 정보(y 값)
  const browserScrollY = window.pageYOffset;
  // ③ 이동할 대상의 위치(y 값)
  const targetScorllY = targetEl.getBoundingClientRect().top + browserScrollY;
  // ④ 스크롤 이동
  window.scrollTo({ top: targetScorllY, behavior: "smooth" });
};

// 스크롤 이벤트 연결하기
const scrollMoveEl = document.querySelectorAll(
  "[data-animation-scroll='true']"
);
for (let i = 0; i < scrollMoveEl.length; i++) {
  scrollMoveEl[i].addEventListener("click", function (e) {
    const target = this.dataset.target;
    animationMove(target);
  });
}

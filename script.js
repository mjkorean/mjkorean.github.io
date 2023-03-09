// 자바스크립트를 사용해 동적으로 처리한 부분 = 총 3군데 //

// 1. 메인 영역의 텍스트 타이핑 효과
// : 화면에 보여줄 텍스트 데이터를 배열로 저장하고, 일정 시간마다 반복하면 타이핑하듯이 화면에 출력
// 2. 헤더 영역의 디자인 변경 효과
// : 헤더 클래스 추가와 삭제 효과
// 웹 브라우저를 스크롤하면 헤더 영역에 새로운 클래스를 추가해 디자인을 변경
// 3. 스크롤 이동 효과
// : 부드러운 이동 애니메이션 효과(behavior 속성이 작동되는 웹 브라우저에서만 작동가능)
// 헤더 메뉴를 클릭하면 페이지 내부의 다른 영역으로 부드럽게 스크롤이 이동

// 즉시 실행 함수: 함수를 정의하면서 동시에 실행까지 하는 함수
// 형식 = (function(){함수 내용 입력})();
// 전역 스코프가 오염되는 것 방지 가능
// 한번 실행되고 나면 메모리에 데이터가 남아 있지 않음 = 이후 재호출 가능
(function () {
  // 즉시 실행 함수 형태로 코드를 감싸주어 작성한 코드를 정리
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

  // 인덱스 초기값도 index 변수에 할당해 배열의 첫번째 요소에 접근히게 함(배열의 인덱스 번호 0번)
  let index = 0;

  // 화면에 표시할 문장 배열에서 요소를 하나 가져온 뒤, 배열로 만들기
  // 텍스트가 입력되는 효과의 핵심은 currentTxt 변수에 할당되 배열 요소를 앞에서부터 한 개씩 출력하는 것
  // 그러면 마치 텍스트가 한 글자씩 작성되는 것처럼 보이게 됨
  // 이를 위해 다음처럼 writeTxt() 함수를 만들어 배열 요소를 한 개씩 출력하게 함
  let currentTxt = txtArr[index].split("");

  // 텍스트 입력 효과 구현
  // 텍스트가 입력되는 효과의 핵심은 currentTxt 변수에 할당된 배열 요소를 앞에서부터 한 개씩 출력하는 것
  // 그러면 마치 텍스트가 한 글자씩 작성되는 것처럼 보이게 됨
  // 이를 위해 다음처럼 writeTxt() 함수를 만들어 배열 요소를 한 개씩 출력하게 함
  function writeTxt() {
    spanEl.textContent += currentTxt.shift(); // 배열의 맨 앞요소를 추출하고 추출한 요소를 원본 배열에서 삭제
    if (currentTxt.length != 0) {
      // 변수에 할당괸 배열의 길이가 0인지 확인 후, 0이 아니라면 반복 출력해줌
      setTimeout(writeTxt, Math.floor(Math.random() * 100)); // 실행 시간 무작위 설정
    } else {
      // else문 실행 = 배열의 길이가 0이 됨 = 배열의 모든 텍스트 출력 완료 =  2.5초 뒤 텍스트 삭제
      currentTxt = spanEl.textContent.split("");
      setTimeout(deleteTxt, 2500);
    }
  }

  // 텍스트 삭제 효과 구현
  // 텍스트 삭제는 입력 과정과 비슷
  // 텍스트를 입력할 때는 배열의 앞에서부터 요소를 추출해 한 글자씩 출력,
  // 텍스트를 삭제할 때는 뒤에서부터 요소를 추출해 한 글자씩 줄어드는 것처럼 표현
  function deleteTxt() {
    currentTxt.pop(); // pop 메서드를 이용해 배열 요소를 끝에서부터 한 개씩 원본 배열에서 삭제
    spanEl.textContent = currentTxt.join(""); // 현재 배열에 있는 요소를 하나의 문자열로 합침, 사용자 눈에는 한 글자가 삭제된 것처럼 보임
    if (currentTxt.length != 0) {
      // 변수에 할당된 배열의 길이가 0인지 확인, 아니라면 반복 삭제하여 출력해줌
      setTimeout(deleteTxt, Math.floor(Math.random() * 100)); // 실행 시간 무작위 설정
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

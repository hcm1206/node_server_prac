// 1번째 콘솔 출력
console.log('First Console');

// 짭타임아웃 함수 정의(인자로 콜백함수와 딜레이 숫자 받아서 콜백함수 실행)
function fakeSetTimeout(callback, delay) {
    callback();
}

// 2번째 콘솔 출력
console.log('Second Console');

// 짭타임아웃 함수 실행(콜백함수는 3번째 콘솔 출력하고, 딜레이 숫자 인자는 장식)
fakeSetTimeout(function() {
    console.log('Third Console');
}, 0);

// 4번째 콘솔 출력
console.log('Fourth Console');

/*
1 -> 2 -> 3 -> 4 순으로 실행됨
짭타임아웃 함수는 비동기 처리가 없기 때문에 그냥 순서에 따라 실행되고 끝
*/
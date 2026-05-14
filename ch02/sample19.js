// 사용자 정의 함수의 비동기 처리

// 인자로 콜백함수를 입력받아 실행하는 사용자 정의 함수
function fakeSetTimeout(callback) {
    callback();
}

// 0 출력
console.log(0);

// 사용자 정의 함수에 인자로 헬로 출력하는 함수를 넘겨 실행
fakeSetTimeout(function() {
    console.log('Hello');
})

// 1 출력
console.log(1);

/*
모두 동기적으로 실행되어
0
헬로
1
순으로 출력(콜백 큐를 거치지 않고 콜 스택을 거쳐 실행)
*/
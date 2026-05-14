// 콜백 함수의 동기 처리

// 3초 후 첫 번째 작업 출력
setTimeout(() => {
    // 3초 + 2초 경과 후 두 번째 작업 출력(첫 번째 작업 출력 후 2초를 다시 대기)
    setTimeout(() => {
        console.log('todo: Second work!');
    }, 2000);
    console.log('todo: First work!');
}, 3000);

// 결과
// todo: First work!  (3초 후 출력)
// todo: Second work! (3+2초 후 출력)

/*
첫 번째 작업 -> 두 번째 작업 순으로 실행하기 위해 콜백 함수를 이용하여 비동기 작업을 동기적으로 처리
*/
// 동기적 처리 ②

// 시간(초)과 콜백 함수를 입력받아 입력받은 시간(초) 경과 후 콜백 함수를 실행하고, 실행한 시각 출력하는 함수 정의
function work(sec, callback) {
    setTimeout(() => {
        callback(new Date().toISOString());
    }, sec * 1000);
};

// 1초 후 첫 번째 작업 출력 및 다음 콜백함수 실행
work(1, (result) => {
    console.log('첫 번째 작업', result);

    // 1초 후 다음 콜백함수 실행 및 두 번째 작업 출력
    work(1, (result) => {

        // 1초 후 세 번째 작업 출력
        work(1, (result) => {
            console.log('세 번째 작업', result);
        });

        console.log('두 번째 작업');
    })
})

/*
비동기 작업 수행 시에는 코드 순서보다 작업 처리 시간이 더 중요하기 때문에
비동기 작업 수행 코드보다 (비동기가 아닌)코드가 뒤에 있어도 비동기 코드보다 먼저 동작하게 됨
1 → 2 → 3 순으로 실행
*/
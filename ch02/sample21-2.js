// 동기적 처리 ①

// 시간(초)과 콜백 함수를 입력받아 입력받은 시간(초) 경과 후 콜백 함수를 실행하고, 실행한 시각 출력하는 함수 정의
function work(sec, callback) {
    setTimeout(() => {
        callback(new Date().toISOString());
    }, sec * 1000);
};

// 1초 후 첫 번째 작업 출력
work(1, (result) => {
    console.log('첫 번째 작업', result);

    // 첫 번째 작업 출력 1초 후 두 번째 작업 출력
    work(1, (result) => {
        console.log('두 번째 작업', result);
        
        // 두 번째 작업 출력 1초 후 세 번째 작업 출력
        work(1, (result) => {
            console.log('세 번째 작업', result);
        })
    })
})

/*
콜백 함수 안에 콜백 함수를 넣어서 비동기적 작업을 순서대로 처리 가능
1 → 2 → 3 순으로 실행
*/
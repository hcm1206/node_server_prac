// 일반 비동기 함수

// 시간(초)과 콜백 함수를 입력받아 입력받은 시간(초) 경과 후 콜백 함수를 실행하고, 실행된 시각 출력하는 함수 정의
function work(sec, callback) {
    setTimeout(() => {
        callback(new Date().toISOString());
    }, sec * 1000);
};

// 1초 후 첫 번째 작업 출력
work(1, (result) => {
    console.log('첫 번째 작업', result);
})

// 1초 후 두 번째 작업 출력
work(1, (result) => {
    console.log('두 번째 작업', result);
})

// 1초 후 세 번째 작업 출력
work(1, (result) => {
    console.log('세 번쨰 작업', result);
})

/*
위 코드는 모두 비동기로 처리되어 동시에 수행되므로, 모두 똑같이 1초 후에 수행됨
*/
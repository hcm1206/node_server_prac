
// 인자로 받은 시간(초)만큼 대기 후 인자로 받은 콜백함수에 실행시간을 매개변수로 보내 실행시키는 함수 정의
function work(sec, callback) {
    setTimeout(() => {
        callback(new Date().toISOString());
    }, sec * 1000);
}

// 1초 후 첫 번째 작업 수행시간 출력, 그 다음 또 1초 후 두 번째 작업 수행시간 출력
work(1, (result) => {
    console.log('첫 번째 작업', result);

    work(1, (result) => {
        console.log('두 번째 작업', result);
    })
})

// 인자로 콜백함수를 넘겨주는 대신 Promise 객체 사용하여 같은 작업 수행

// 인자로 받은 시간(초)만큼 대기 후 대기 종료 시각이 담긴 Promise 객체 반환
function work2(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date().toISOString());
        }, sec * 1000);
    });
};

// 1초 대기 후 종료 시각을 받아 1번째 작업 출력
work2(1).then((result) => {
    console.log('1 번째 작업', result);
    // 1번째 작업 출력 후 또 1초 대기한 뒤 종료시각을 받아 2번째 작업 출력
    return work2(1, result);
}).then((result) => {
    console.log('2 번째 작업', result);
});
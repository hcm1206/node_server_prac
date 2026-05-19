// .then()의 이용

// 인자로 받은 초만큼 대기 후 에러 발생시키는 함수
function wait(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error!');
        }, sec * 1000);
    });
}

/*
then을 이용하여 Promise 객체 내부에서 성공했을 경우(resolve)와 실패했을 경우(reject)를 나누어 처리 가능
*/

// wait() 함수에 3초 대기 후 결과에 따라 작업 수행
wait(3).then(() => {
    console.log('Success');             // 성공(resolve 반환) 시 성공 출력
}, e => {
    console.log('Catch in Then ', e);   // 실패(reject 반환) 시 throw된 에러 출력
})
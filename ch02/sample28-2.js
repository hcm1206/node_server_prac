// async/awiat의 예외 처리 ②

/*
async 함수 사용 시 Promise 객체를 사용할 때와 동일하게 예외 처리
*/

// 에러 throw 하는 async 함수 정의
async function myAsyncFunc() {
    throw 'myAsyncFunc Error!';
}

// 에러 reject 던져버리는 Promise 객체 반환하는 함수 정의
function myPromiseFunc() {
    return new Promise((resolve, reject) => {
        reject('myPromiseFunc Error!');
    });
}

// async 함수에서 발생한 에러 catch문으로 제어하여 에러 내용 출력
const result = myAsyncFunc().catch(e => {console.log(e)});
// Promise 반환하는 함수에서 발생한 에러 catch문으로 제어하여 에러 내용 출력
const result2 = myPromiseFunc().catch(e => {console.log(e)});
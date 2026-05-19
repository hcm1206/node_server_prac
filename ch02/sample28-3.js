// async/await의 예외 처리 ③

// 인자로 받은 시간(초)만큼 대기 후 reject로 에러 던지는 Promise 객체 반환하는 wait() 함수 정의
function wait(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('throw Error!');
        }, sec * 1000);
    });
}

// 실행 시작 시점 시각 출력 후, wait() 함수에 인자로 2초 넣어서 발생하는 에러를 catch하여 
// 출력 후 실행 종료 시점 시각 출력하는 myAsyncFunc() async 함수 정의
async function myAsyncFunc() {
    console.log(new Date());
    try {
        await wait(2);
    } catch (e) {
        console.error(e);
    }
    console.log(new Date());
}

// myAsyncFunc() 함수 실행 후 결과 저장
const result = myAsyncFunc();

/*
async 함수에서 await을 사용한 경우 try catch 또는 .catch문을 사용
비동기 처리 중 예외 발생 시점은 try 블록 내의 시간과 일치하기 때문

const result = await wait(2).catch(e => {console.error(e) });

만약 Promise 객체를 반환받는 부분에 catch문을 붙인다면 resolve시 catch문이 실행되지 않으므로
반환받는 부분 결과값이 catch문에 의해 통째로 undefined될 수 있음
*/
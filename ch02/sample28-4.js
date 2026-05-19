// async/await의 예외 처리 ④

// 정상적으로 처리하는 척 하면서 기괴한 코드를 섞어서 오류 발생시키는 함수 정의
async function myAsyncFunc() {
    // 오류를 일으키는 아무튼 기괴한 코드
    consolejljalk.log(new Date());
    // 아래 내용은 장식
    const result = await wait(2).catch(e => {
        console.error(e);
    });
    console.log(new Date());
}

// 얘도 장식
function wait(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('throw Error!');
        }, sec * 1000);
    });
}

// 기괴한 코드로 인해 실행되는 (Promise 객체가 보내주는 예외(reject)가 아닌) 오류는 try catch로 처리 불가
try { myAsyncFunc(); } catch (e) { } // ==> X
// .catch 문 사용하여 Promise 객체의 예외(reject)가 아닌 다른 예외들도 처리
myAsyncFunc().catch(e); // ==> O

/*
try catch문은 Promise 객체에서 던지는 예외(reject)만 catch하기 때문에
그 외의 오류는 .catch문으로 처리해야 함
*/
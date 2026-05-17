// Promise 객체와 async/await

/*
비동기 처리를 위해 콜백 함수만 사용해도 되고, Promise 객체를 사용해도 되고, async/await을 사용해도 됨
가독성을 위해 콜백 -> Promise -> async/await를 사용하기 시작
async/await을 사용하면 Promise 객체 선언 및 resolve, reject를 넘겨주는 부분을 생략할 수 있으므로
1. 코드 양이 줄어듦
2. try/catch 사용 가능
3. 중첩 현상 해결 가능
*/

// Promise 객체를 반환하는 함수
function workP(sec) {
    // 1초 후에 현재 시간을 출력하는 작업 수행 Promise 객체 반환
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date().toISOString());
        }, sec * 1000);
    });
}

// 걍 함수
function justFunc() {
    return 'just Function';
}

// async 함수
async function asyncFunc() {
    return 'async function';
}

// 걍 함수는 문자열을 그대로 반환
console.log(justFunc());
// async 함수는 Promise 객체 반환
console.log(asyncFunc());
// 얘도 Promise 객체 반환
console.log(workP());
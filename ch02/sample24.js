// async/await의 사용

/*
async 키워드를 붙인 함수 안에서 lock을 걸어 놓고 싶은 부분에 await을 붙여서 사용
즉 비동기로 처리하고 싶은 함수에 async를 붙이고, 비동기 처리를 할 특정 부분에 await을 붙임
*/

// 매개변수로 전달받은 시간(초)만큼 대기 후 문자열을 결과값으로 내는 Promise 객체 반환하는 함수 정의
function workP(sec) {
    return new Promise((resolve, reject) => {
        // 입력받은 시간(초)가 지나면 'workP function' 문자열을 결과로 반환
        setTimeout(() => {
            resolve('workP function');
        }, sec * 1000);
    });
}

// workP 함수 3초 수행 후 결과를 출력하고 async 문자열 반환하는 async 함수 정의
async function asyncFunc() {
    // workP 함수 처리하는 과정(3초 대기 후 문자열 출력)을 대기(await)
    // 원래 workP 함수가 비동기적으로 처리되지만 await을 붙였으므로 workP 함수 완료 전까지 대기하도록 동기적으로 수행됨
    const result_workP = await workP(3);
    // workP 함수 처리 결과(Promise 객체의 처리 결과 문자열) 출력
    console.log(result_workP);
    // async 함수 문자열 출력
    return 'async function';
}

// asyncFunc() 함수 수행 후 반환 값(async 함수 문자열) 출력
asyncFunc().then((result) => {
    console.log(result);
})
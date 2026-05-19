// async/await의 예외 처리 ①

/*
async 함수는 Promise 객체 인스턴스를 반환
실행 성공 시 resolved 프로퍼티를, 실패 시 reject 프로퍼티를 반환
*/

// 'done' 문자열 프로퍼티가 들어있는 Promise 객체 반환하는 async 함수
async function myAsyncFunc() {
    return 'done';
}

// async 함수 결괏값 저장
const result = myAsyncFunc();
// 결괏값 출력하면 Promise 객체
console.log(result); // Promise { <resolved>; "done" }
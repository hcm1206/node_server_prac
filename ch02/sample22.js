// Promise의 사용

/*
Promise : 콜백 지옥을 탈출하게 해주는 자바스크립트 API
보낸 요청에 대해 응답이 준비되었을 때 알림을 주는 알리미 역할
*/

// 초 입력받아 입력받은 초 경과 후 완료시각 출력하는 Promise 객체 반환하는 함수 정의
function workP(sec) {
    // Promise의 인스턴스를 반환하고
    // then에서 반환한 것을 받음
    return new Promise((resolve, reject) => { // Promise의 인스턴스를 생성하여 반환
        // Promise 생성 시 넘기는 callback = resolve, reject
        // resolve 동작 완료시 호출, 오류 났을 경우 reject
        setTimeout(() => {
            resolve(new Date().toISOString());
        }, sec * 1000);
    });
}


workP(1).then((result) => {
    // 1초 후 첫 번째 작업 및 완료 시각 출력
    console.log('첫 번째 작업', result);
    return workP(1);
    // 완료되었으면 1초 후 두 번째 작업 및 완료 시각 출력
}).then((result) => {
    console.log('두 번째 작업', result);
})

/*
Promise 생성 시 매개변수로 resolve와 reject를 넘김
resolve는 요청 성공 시 수행하는 콜백 함수
reject는 요청 실패 시 수행하는 콜백 함수
*/

/*
then은 Chaining하여 사용 가능하므로, 이를 이용하여 callback을 순차적으로 지정하여 비동기 처리 수행 가능
첫 번째 then()에서 반환한 값을 두 번째 then()으로 넘겨주는 방식으로 then()을 붙인 순서대로 처리됨
*/
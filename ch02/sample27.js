// .catch()의 이용

/*
일반적으로 비동기 상황에서는 예외가 발생하는 시점과 try()가 싸고 있는 시간이 일치하지 않으므로
try catch 구문으로 오류를 잡을 수 없음
*/

// 인자로 받은 초만큼 대기 후 에러 발생시키는 함수
function wait(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error!');
        }, sec * 1000);
    });
}

// 3초 후 에러 발생하면 catch문으로 오류 출력
wait(3).catch(e => {
    console.log('1st catch ', e);
});

// .catch 구문은 일반적으로는 chaining이 불가
wait(3).catch(e => {
    console.log('1st catch ', e);
}).catch(e => { // 위의 catch문이 잘 실행되었기 때문에 Error을 throw하지 않아 아래는 실행되지 않음
    console.log('1st catch ', e);
})

// .catch 구문을 chaining하고 싶으면 catch문 내에서 또다시 Error 객체를 throw해주면 됨
wait(3).catch(e => {
    console.log('1st catch ', e);
    throw e;    // catch문 내에서 wait 함수에서 받아온 Error를 다시 throw
}).catch(e => {
    console.log('1st catch ', e); // throw된 Error가 있으므로 catch문이 실행되어 받아온 Error를 출력
})
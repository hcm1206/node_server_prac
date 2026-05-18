// 일반적인 예외처리

// Error throw하는 함수
function f2() {
    console.log('this is f2 start');
    throw new Error('오류') // Error 객체 - 해당하는 콜 스택 정보가 담김
    console.log('this is f2 end'); // 위에서 에러 throw해서 실행 안 됨
}

// f2() 함수 실행하면서 Error throw 받으면 오류 내용 출력하는 함수
function f1() {
    console.log('this is f1 start');
    try {
        f2();
    } catch (e) {
        console.log(e);
    }
}

f1();

/*
에러 throw시 에러 발생 지점 이후 내용은 실행되지 않음
예외가 발생할 수 있는 부분을 try() 함수 내에 넣고, try() 내부에서 예외 발생 시 처리할 구문을 catch() 부분에 작성
*/
// 클로저의 개념

/*
클로저(closure) : 내부 함수가 외부 함수의 스코프(범위)에 접근할 수 있는 것을 의미
JS에서 스코프는 함수 단위로 생성됨
*/

// 외부 함수 outer() 선언
function outer() {
    // var 변수 a, b 선언하여 각각 'A', 'B' 문자 할당
    var a = 'A';
    var b = 'B';

    // 내부 함수 inner() 선언
    function inner() {
        // inner 함수 내부의 var 변수 a 선언하여 'AA' 문자 할당
        // (outer() 함수의 a 변수와는 별개 -> function-level-scope) 
        var a = 'AA';
        console.log(b);
    }
    return inner;
}

// outerFunc 변수에 outer() 함수 실행 결과(inner 함수) 저장
var outerFunc = outer();
// outerFunc 변수에 저장된 함수(inner 함수) 실행(b 변수에 저장된 값(B) 출력)
outerFunc();

/**
이미 outerFunc 변수를 초기화하면서 outer() 함수가 호출된 후 종료되었음에도
outer() 내부에서 선언된 inner() 함수를 호출할 수 있음
즉, inner() 함수 스코프가 outer() 함수 스코프를 참조하고 있으며
outer() 함수 실행이 끝나고 소멸된 후에도 inner() 함수가 outer() 함수 스코프 접근 가능
*/
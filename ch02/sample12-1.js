// this의 사용

/*
자바스크립트에서 this는 함수 호출 방법에 의해 결정

웹 브라우저 콘솔에서 console.log(this);를 실행하면 결과로 Windows 객체가 출력
console.log(this);를 호출한 함수는 전역(Global)이고 웹 브라우저에서 Global은 Window 객체를 의미하기 때문
*/
 
// people 객체 정의
var people = {
    name: 'gildong',
    // people 객체 내의 say 함수 선언
    say: function () {
        // this를 출력하는데 함수 호출 방법에 따라 this가 달라짐
        console.log(this);
    }
}

// people 객체가 선언한 say() 함수에서 this는 people 객체가 됨
people.say();

// sayPeople 변수에 people 객체의 say 함수를 저장
var sayPeople = people.say;
// sayPeople 함수를 실행하면 people 객체에 종속된 것이 아니라 함수 자체가 전역(Global)에서 실행된 것이므로
// this는 전역(Global) 객체가 되어 이 전역 객체를 this로써 출력함
sayPeople();
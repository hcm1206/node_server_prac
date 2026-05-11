// bind 함수 사용

/*
객체의 함수를 객체 외부에서 따로 저장했지만 함수의 this를 기존 객체로 고정하고(종속시키고) 싶을 경우
bind(this로 고정시킬 객체) 함수를 이용하면 됨
*/

// people 객체 정의
var people = {
    name: 'gildong',
    // 호출 방법에 따른 this를 출력하는 say() 함수 선언
    say: function () {
        console.log(this);
    }
}

// people 객체의 say 함수 호출 : this는 say 함수가 종속된 people 객체이므로 people 객체 출력
people.say();

// sayPeople 변수에 people 객체의 say 함수 저장 및 this를 people 객체로 고정
var sayPeople = people.say.bind(people);
// people 객체의 say 함수만 따로 실행하였으나 기존 객체와 고정되어 있으므로 say 함수 상의 this인 people 객체 출력
sayPeople();

/*
화살표 함수의 경우 this가 존재하지 않으므로 bind를 사용해도 this 주입 불가능,
때문에 생성자(new)를 사용해 화살표 함수로 만들어진 객체의 인스턴스 생성 불가

화살표 함수로 만들어진 객체에 this 사용 시 일반적인 인자나 변수와 동일하게 취급하여
상위 함수의 this나 전역(Global) 객체의 this를 불러옴
*/

// animal 객체 정의
var animal = {
    species: "dog",
    // this를 출력하는 say() 함수 선언
    // (화살표 함수에는 this가 존재하지 않으므로 상위 함수 this 또는 전역(Global) 객체 this 출력)
    say: () => {
        console.log(this);
    }
}

// animal 객체의 say() 함수 직접 호출
animal.say();
// animal 객체의 say를 변수로 저장 후 호출
var sayAnimal1 = animal.say;
sayAnimal1();
// animal 객체의 say를 bind 함수 사용하여 변수로 저장 후 호출
var sayAnimal2 = animal.say.bind(animal);
sayAnimal2();

/*
위 세 가지 결과 모두 전역(Global) 변수를 출력
*/
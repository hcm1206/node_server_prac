// 객체 배열 생성

/*
배열은 [요소 1, 요소 2, ...]를 통해 생성할 수 있음
배열 안에는 숫자, 문자열, 객체 등 어떤 것이든 요소로 넣을 수 있음
배열에 요소를 추가하려면 .push() 내장 함수를 이용해 원하는 요소를 추가 가능
*/

// 커피 const 배열 생성
const coffee = [];
// 커피 배열에 {name: 아메리카노(문자)} 객체 추가
coffee.push({name: 'Americano'});
// 커피 배열에 {name: 라떼(문자)} 객체 추가
coffee.push({name: "Latte"});

/*
const 배열의 경우 배열 자체를 변경하는 것이 불가능한거고
배열 내부 요소를 추가하거나 변경하는 등의 행위는 제한 없음
*/

// 커피 배열 ([{name: Americano}, {name: Latte}])  출력
console.log(coffee);
// 커피 배열 0번째 원소 ({name: Americano} 객체) 출력
console.log(coffee[0]);
// 커피 배열 길이(2) 출력
console.log(coffee.length);
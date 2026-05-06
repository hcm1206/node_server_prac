// 변수 호이스팅
/*
변수 호이스팅(Hoisting) : 변수의 선언과 초기화가 동시에 이루어져, 아직 값이 없음에도 오류가 나지 않는 현상
*/

// 견공자제(puppy)를 선언하지 않고 호출하여 undefined로 출력됨
console.log(puppy);
// 견공자제(puppy)를 선언하고 "cute" 문자 초기화
var puppy = "cute";
// 선언 및 초기화된 견공자제를 출력
console.log(puppy);


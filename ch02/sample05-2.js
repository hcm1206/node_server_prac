// let의 특징

/*
let은 값을 재할당할 수 있어 선언한 이후에도 값 변경 가능
let과 const는 선언 후 값을 재할당 가능한지에 따라 구분되며, 그 외에는 거의 같은 기능을 함
*/

// 견공 선언
let dog;
// 견공 선언 후 값 초기화 없이 출력 -> undefined
console.log(dog);
// 선언된 견공에 "so lovely" 문자 저장
dog = "so lovely";
// 견공을 출력하면 위에서 초기화했던 문자 출력됨
console.log(dog);
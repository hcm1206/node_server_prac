// const을 사용한 변수 호이스팅 문제 해결

/*
const는 let과 유사한데 변수 재선언은 물론, 재할당도 불가한 "상수" 취급
*/

// 견공 상수 선언 후 "cute"로 초기화
const puppy = "cute";
// 견공 상수를 재선언하여 "so cute"로 바꾸려하면 에러를 띄우며 기열찐빠
const puppy = "so cute";


/*
const도 let과 유사하게 변수 호이스팅 문제를 해결 가능
let과 const의 차이점은 이후에 설명
*/
// 구조 분배 할당

/*
객체나 배열을 변수로 간편하게 '분해'해주는 문법
*/

// animal 배열에 [견공, 떼껄룩] 저장(원본 배열)
const animal = ['dog', 'cat'];
// first, second 변수에 animals 배열 첫번째 원소(견공), 두번째 원소(떼껄룩) 저장(배열 분해 및 구조 분배 할당)
let [first, second] = animal;

// first 변수 값(견공) 출력
console.log(first);
// second 변수 값(떼껄룩) 출력
console.log(second);
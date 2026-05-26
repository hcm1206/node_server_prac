// 순환 참조 ①

// A2.js에서 A 변수 선언
const A = 'variable A from A2.js';
// B2.js에서 B 변수 가져오기
const B = require('./B2');

// 가져온 B 변수 출력
console.log(B + ' in A2.js');

// A 변수 수출
module.exports = A;

/*
자바스크립트는 순환 참조를 허용하므로 B2.js가 실행되지 않아도 B 출력
*/
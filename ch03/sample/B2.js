// 순환 참조 ②

// A2.js에서 A 변수 가져오기
const A = require('./A2');
// B2.js에서 B 변수 선언
const B = 'variable B from B2.js';

// 가져온 A 변수 출력
console.log(A + ' in B2.js');

// B 변수 수출
module.exports = B;


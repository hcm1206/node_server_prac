const a = require('./a');
const b = require('./b');

a.call();
b.call();

/*
실행 순서
1. index.js에서 모듈 a를 로드하면서 a.js 실행, a.js에 있는 "a.js 진입" 출력
2. a.js에서 모듈 b를 로드하면서 b.js 실행, b.js에 있는 "b.js 진입" 출력
3. b.js에서 모듈 a를 로드, 그러나 현재 a.js는 
   const b = require('./b');
   를 실행중이므로 call이 export되지 않았으므로 a에 빈 객체 저장 
4. b.js에서 빈 객체 a를 출력하는 함수 call() 정의 및 export 수행
5. a.js에서 b.js가 export한 call() 함수를 b로 저장하고, b를 출력하는 함수 call() 정의 및 export 수행
6. index.js에서 a.js가 export한 call() 함수 실행(b.js에서 가져온 call() 함수 객체 출력)
7. index.js에서 b.js가 export한 call() 함수 실행(a.js에서 가져오려 시도했던 빈 객체 출력)
*/
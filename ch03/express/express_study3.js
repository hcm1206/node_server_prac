// 미들웨어 사용법 ③

/*
미들웨어(Middleware) : 중간단계 역할을 하는 존재라는 뜻으로, 
요청과 응답 사이에 express 자체에 있는 기능 외에 추가적인 기능을 넣어줄 수 있음
express 사용법의 핵심이라고 할 정도로 중요
인증 수행, 예외처리, 세션처리, 라우터 등 많은 종류가 있음 
*/

// express 로드
const express = require('express');
const app = express();

// 루트 주소 GET 요청 시 Hello World 응답으로 전송
app.get('/', function (req, res) {
    res.send('Hello World!');
})

// LOGGED 콘솔 출력하는 myLogger 미들웨어 함수 정의
const myLogger = function (req, res) {
    console.log('LOGGED');
};

// 미들웨어 함수 등록
app.use(myLogger);

// 8080 포트에서 서버 실행
app.listen(8080);

/*
미들웨어는 위에서 아래로 실행되기 때문에 순서가 중요

이 코드의 경우 app.get('/')이 수행된 후 res.send()가 끝나고 응답을 종료해버리므로
원칙적으로는 myLogger까지 도달하지 않음

다만, 실제로 실행해보면 LOGGED가 정상적으로 출력되는데,
브라우저에서는 관례적으로 GET '/' 요청과 GET '/favicon.ico' 두 번의 요청을 보냄
따라서 GET '/' 요청은 app.get('/') 함수를 실행하여 Hello World를 응답으로 보낸 후 완료되고,
그 다음으로 GET '/favicon.cio' 요청은 라우팅 처리가 없기 때문에 매칭에 실패하고 app.use(myLogger)까지 내려가 'LOGGED'가 출력됨

/favicon.ico는 브라우저가 탭에 표시할 아이콘을 확인하기 위해 자체적으로 요청하는 주소로,
GPT피셜 역사적인 웹 브라우저 관례라고 함
*/
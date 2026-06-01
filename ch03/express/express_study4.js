// 미들웨어 사용법 ②

// express 로드
const express = require('express');
const app = express();

// 루트 주소 GET 요청 시 Hello World 응답으로 전송 후 다음으로 등록된 미들웨어 실행
app.get('/', function (res, res, next) {
    res.send('Hello World!');
    next();
});

// 'LOGGED' 로그 출력 후 다음 미들웨어 실행하는 myLogger 미들웨어 함수 정의
const myLogger = function (res, res, next) {
    console.log('LOGGED');
    next();
}

// myLogger 미들웨어 등록
app.use(myLogger);

// 8080 포트에서 서버 실행
app.listen(8080);

/*
next()는 다음 미들웨어로 넘어가는 역할을 하는 함수
몇 가지 인자를 넣어 다른 기능도 수행 가능
next() : 다음 미들웨어로 가는 역할
next(error) : 오류 처리 미들웨어로 가는 역할
next('route') : 많이 사용하지는 않지만 next()로 같은 라우터에서 분기처리를 할 때 사용
*/
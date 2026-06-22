// 내 API 서버 만들기

// express 모듈 로드 및 express 앱 생성
const express = require('express');
const app = express();

// /{type} GET 요청 라우팅 처리 함수
app.get('/:type', (req, res) => {
    // URL 파라미터로 받은 {type}을 응답 값으로 전송
    let {type} = req.params;
    res.send(type);
});

// 8080 포트에 클라이언트 연결
app.listen(8080);

/*
URL로 요청한 값을 변수에 담아 그대로 응답으로 보내는 매우 단순한 API 서버 역할을 하는 코드
*/
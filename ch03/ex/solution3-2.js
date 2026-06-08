// express 모듈 로드
const express = require('express');

const app = express();

// set(), 포트 지정
app.set('port', process.env.PORT || 8080);
// use(), static 경로 사용 위한 미들웨어 실행
app.use(express.static(__dirname + 'public'));
// get(), 루트 주소('/') GET 요청에 대한 응답 처리
app.get('/', (req, res) => {
    res.send('메인 페이지입니다.');
});
// get(), 유저 주소('/user/{사용자아이디}') GET 요청에 대한 응답 처리
app.get('/user/:id', (req, res) => {
    res.send(req.params.id + "님의 개인 페이지입니다.");
});

// 지정한 포트번호와 클라이언트 연결
app.listen(app.get('port'));
// 미들웨어를 이용한 예제 ①

// express 모듈 로드
const express = require('express');
const app = express();

// 포트를 지정한 기본 포트번호 또는 8080으로 설정
app.set('port', process.env.PORT || 8080);

// 실행 경로의 /public 디렉터리를 static 폴더로 지정하는 미들웨어 설정
app.use(express.static(__dirname + '/public'));

// 루트 주소('/')로 GET 요청 시 html 코드를 응답으로 전송
app.get('/', (req, res) => {
    const output = `
        <h2>express로 웹 만들기</h2><br>
        <p>메인 페이지입니다.</p><br>
        <img src="./sample.svg" width="400px" height="200px"/>
    `
    res.send(output);
});

// 유저 아이디 주소(/user/:id)로 접속 시 요청(request) 파라미터로 받은 id를 포함한 문자열을 응답으로 전송
app.get('/user/:id', (req, res) => {
    res.send(req.params.id + "님의 개인 페이지 입니다.");
});

// 설정한 포트에서 서버 실행 및 로그 출력
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});

/*
router도 일종의 미들웨어로, 클라이언트로부터 요청(request)이 왔을 때 보낼 응답(response)을 결정
*/
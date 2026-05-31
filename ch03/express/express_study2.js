// express 사용법 ②

// express 모듈 로드하여 변수에 할당
const express = require('express');

const app = express();

// 실행 포트 지정(process.env 객체에 기본 포트번호가 있다면 해당 포트를 사용, 그렇지 않으면 8080 포트 사용)
app.set('port', process.env.PORT || 8080);

// 루트 주소('/')에 대한 GET 요청 시 html 파일을 응답으로 전송
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 포트 연결 및 서버 실행
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
})

/*
html 파일을 보낼 때 fs 모듈의 .readFile() 대신 sendFile() 사용
http 모듈로 응답 전송 시 writeHeader를 통해 Content-type, Chartset 정보를 보내야 했으나
express의 res 객체 sendFile 메서드 사용시 자동으로 클라이언트에 전송

http 모듈에서 요청 주소 추가 시 if else를 통해 요청 주소를 분리해야 했으나
express에서는 app.get 등의 메서드로 주소 분리 가능
*/
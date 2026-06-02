// static 미들웨어 사용 ①

// express 모듈 로드
const express = require('express');
const app = express();

// 포트를 지정된 기본 포트번호 또는 8080로 설정
app.set('port', process.env.PORT || 8080);

// 실행 경로의 /public 디렉터리를 static 폴더로 지정하는 미들웨어 실행
app.use(express.static(__dirname + '/public'));

// 루트 주소('/')에 대한 GET 요청 시 index2.html 파일 전송
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index2.html');
});

// 설정된 포트에서 서버 실행 및 로그 출력
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});

/*
express.static : 다양한 종류의 정적 파일들을 저장할 static 폴더의 경로를 지정할 때 사용하는 미들웨어
static 폴더 지정 시 지정한 파일이 바로 클라이언트로 가는 것이 아닌 static 미들웨어를 거친 후 도착

/public 폴더 생성하여 이미지를 저장한 후 index2.html에 이미지 추가하면 
서버가 자동으로 static 폴더(/public)의 이미지를 불러옴
*/
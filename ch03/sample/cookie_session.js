// 세션을 통한 키 값 생성

/*
세션(Session) : 실제 정보는 서버에만 저장해두고 브라우저에는 암호화된 키 값만 보내어 
                키 값으로 실제 값에 접근할 수 있도록 하는 것
*/

// http 모듈 로드
const http = require('http');

// 세션 저장용 객체 생성
const session = {};
// 세션 키 값 저장용 변수 선언(날짜를 키로 사용)
const sessKey = new Date();
// 세션 키 값(날짜)에 대한 세션 값을 젠슨 황으로 지정
session[sesskey] = { name: 'JensenHuang'};

// 세션으로 생성한 키 값을 쿠키 값으로 전달하여 서버 생성
http.createServer((req, res) => {
    res.writeHead(200, {'Set-cookie': `session=${sessKey}` });
    res.end('Session-Cookie --> Header');
})
    // 8080 포트에서 클라이언트 연결
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결 중 ..');
    })
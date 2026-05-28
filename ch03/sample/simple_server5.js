// REST를 통한 페이지 생성

// http 모듈 로드
const http = require('http');

// 서버 생성
http.createServer((req, res) => {
    // 요청(req) URL이 기본 페이지(루트)이면 응답(res)으로 Hello를 전송
    if (req.url === '/') {
        res.write('Hello');
        res.end();
    }
})
    // 8080 포트를 클라이언트와 연결하도록 지정 후 연결 시 콘솔 출력
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결')
    })

/*
REST(REpresentation State Transfer) : 요청을 보낼 때 주소를 통해 내용을 표시하는 것
*/
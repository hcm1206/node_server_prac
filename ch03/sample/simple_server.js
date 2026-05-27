// 5줄로 만드는 서버

// http 모듈 로드
const http = require('http');

// 서버 생성
http.createServer((req, res) => {
})
    // 서버를 8080 포트에서 오픈
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결 중 ..');
    })

/*
이 코드를 실행 시킨 후
웹 브라우저 주소 창에 localhost:8080으로 접속하면 무한로딩
이벤트 리스너에 request나 response를 등록하지 않았기 때문
*/
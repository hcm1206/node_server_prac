// request와 response 확인

// http 모듈 로드
const http = require('http');

// 서버 생성
http.createServer((req, res) => {
    // request 객체 출력
    console.log(req);
    // response 객체 출력
    console.log(res);
})
    // 8080 포트 열어놓고 연결 시 콘솔 로그 출력
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결');
    })

/*
서버 열어놓고 브라우저로 접속하면 response 등 구현한게 아무것도 없지만 request가 왕창 들어옴
request 중 url과 method 데이터를 실제로 사용 가능하며 req.url과 req.method로 각각 확인 가능
*/
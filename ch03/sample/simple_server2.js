// 웹 페이지의 요청에 대한 응답

// http 모듈 로드
const http = require('http');

// 서버 생성 (인자로 요청에 대한 응답(실행할 작업)이 작성된 콜백함수 보냄)
http.createServer((req, res) => {
    // 응답 헤더 기록(성공을 뜻하는 200 코드와 HTML 콘텐츠 타입 입력)
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // 응답 데이터(h1 태그) 기록
    res.write('<h1>Node.js로 서버 만들기</h1>');
    // 응답 데이터(p 태그) 기록 및 응답 종료
    res.end('<p>3장 http모듈 공부 중입니다.</p>');
})
    // 클라이언트와 연결할 포트번호와 서버 연결 시 실행할 콜백 함수 입력
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결 중 ..');
    });

/*
서버 실행 후 localhost:8080 접속 시
응답(res)으로 보낸 데이터(h1 태그, p1 태그 등)이 브라우저 창에 표시됨
*/
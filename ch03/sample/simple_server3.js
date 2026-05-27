// 문자열을 보내는 응답 코드

// http 모듈 로드
const http = require('http')

// 서버 생성
const server = http.createServer((req, res) => {
    // 응답 데이터 기록
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Node.js로 서버 만들기</h1>');
    res.end('<p>3장 http 모듈 공부 중입니다.</p>');
})
    // 클라이언트와 연결할 포트 번호 지정
    .listen(8080);

/* Listening Event Listener */
// 서버에 listening 이벤트 리스너 등록(서버 연결 출력)
server.on('listening', () => {
    console.log('8080포트에서 서버 연결 중 ..');
});

/* Error Event Listener */
// 서버에 오류 핸들링 이벤트 리스너 등록(오류 출력)
server.on('error', () => {
    console.error(error);
})

/*
listen() 메서드에 콜백을 넣는 대신
서버에 이벤트 리스너를 붙여서 사용 가능

오류 처리를 할 때는 오류 발생 시에도 응답 콜백 함수를 넣어 서버가 응답하도록 처리해줘야 함
안 하면 무한로딩 ㅅㄱ

하나의 요청에는 하나의 응답만 전송해야 함
*/
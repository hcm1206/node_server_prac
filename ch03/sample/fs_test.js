// 파일을 보내는 응답 코드

// http 모듈 로드
const http = require('http');
// 파일시스템 모듈 로드
const fs = require('fs').promises;

// 서버 생성 (요청(req), 응답(res) 인자 2개를 받는 async 콜백 함수 등록)
http.createServer(async (req, res) => {
    // html 파일 로드 시도하여 요청에 대한 응답으로 html 파일 전송
    try {
        const f = await fs.readFile('ch03/sample/fs_test.html');
        res.writeHead(200, { 'Content-Type': 'text.html; charset=utf-8' });
        // 200이면 요청 성공
        res.end(f);
    }
    // html 파일 로드 및 전송 도중 실패 시 에러메시지를 서버 콘솔창에 출력하고 클라이언트 브라우저 창으로 전송
    catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text.html; charset=utf-8' });
        // 500이면 서버에 오류 발생
        res.end(err.message);
    }
})
    // 클라이언트와 연결할 포트(8080) 등록 및 서버 연결 시 콘솔에 메시지 출력
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결 중 ..');
    });


/*
일반적으로는 응답 콜백에 html 요소를 직접 넣어주는 것이 아닌
html 파일을 따로 만들어 파일시스템(fs) 모듈로 읽어 전송
*/
// express 사용법 ①

// express 모듈 불러오기
const express = require('express');
const app = express();

// 루트 페이지 요청 시 헬로 월드 응답 전송
app.get('/', (req, res) => {
    // 
    res.send('Hello World!');
});

// 8080 포트에서 클라이언트 연결 설정
app.listen(8080, () => {
    console.log('8080포트에서 서버 실행 중');
})

/*
express 모듈 res 객체의 send 함수로 http 모듈 res 객체의 write, end 기능 모두 수행
이와 같이 express 모듈로 http 모듈보다 훨씬 짧은 코드로 서버 생성 가능
*/
// 오류 처리를 위한 미들웨어 함수

// express 로드
const express = require('express');
const app = express();

// 오류 발생시켜 콘솔에 출력하고 500 에러 터뜨려서 겁주는 미들웨어 함수 등록
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 3000 포트에서 서버 실행
app.listen(3000);

/*
오류 처리를 위한 미들웨어 함수는 총 네 개의 파라미터 error, req, res, next를 가지며
오류는 오류 처리 미들웨어에서 따로 다루어야 함

일반적으로 express로 서버 구축 시 다음과 같은 순서로 구조를 구성

1. express 로드
const express = require('express');
const app = express();

2. 포트 설정
app.set('port', process.env.PORT || 3000);

3. 공통적으로 사용하는 미들웨어 장창
app.use(~...) // 공통 미들웨어 morgan, cookie-parser, express.json, express.urlencoded, session 등

4. 라우터 구성
app.get(~...) // 라우터

5. 404 처리 미들웨어 구성
app.get((req, res, next) => res.status(404)...) // 404 처리 미들웨어
// 단 res.status 상태 코드의 400 500번 대를 너무 자세히 보여주면 해킹 위험이 있음

6. 오류 처리 미들웨어를 구성
app.use((err, req, res, next) => ...) // 오류 처리 미들웨어

7. 생성된 서버가 포트를 리스닝
app.listen(app.get('port'));
*/
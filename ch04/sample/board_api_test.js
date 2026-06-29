// 게시판 API 서버 테스트

// 모듈 로드
const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();

// 3000 포트에서 express 앱 실행
app.set('port', 3000);

/* 공통 미들웨어 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* axios 요청 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/board_api_test.html");
});

/* 서버와 포트 연결.. */
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});

/*
board_api2.js를 실행하면 8080 포트에서 서버가 실행되고
클라이언트 역할을 할 또다른 서버를 3000 포트에서 실행하는 코드
*/

/*
이 코드 실행 시 브라우저 콘솔 창에서 CORS 오류 발생하며 제대로 동작하지 않음
CORS(Cross-Origin-Resource-Sharing) : 브라우저에서 서버로 요청 전송 시 
                                    도메인 이름이 서로 다른 사이트 간 공유를 설정하지 않고 
                                    axios 요청과 같은 XMLHttpRequest나 Fetch API 호출 시 생기는 오류
SOP 보안 모델에서는 같은 출처에 대한 http 요청만 허락
이를 해결하기 위해 API를 제공하는 API 서버 쪽에서 API 요청을 보낸 Origin에 Acess-Control-Allow-Origin을 Response Header에 넣어주어야 함
*/
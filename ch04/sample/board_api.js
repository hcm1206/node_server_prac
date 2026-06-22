// 간단한 게시판 API 서버 만들기

// dotenv 사용 위한 모둘 로드
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// 로그 출력 모듈 로드
const morgan = require('morgan');

/* express app generate */
// express 모듈 로드 및 express 앱 생성
const express = require('express');
const app = express();

/* 포트 실행 */
app.set('port', process.env.PORT || 8080);

/* 공통 미들웨어 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 테스트를 위한 게시글 데이터 */
// 일반적으로 데이터베이스를 사용해야 하나, 테스트용으로 전역변수 사용
let boardList = [];
let numOfBoard = 0;

/* 라우팅 설정 */
// 루트 주소 GET 요청 시 문자열 응답 전송
app.get('/', (req, res) => {
    res.send('This is api.js');
});

/* 게시글 API */
// /board 주소 GET 요청 시 현재 게시글 데이터를 응답으로 전송
app.get('/board', (req, res) => {
    res.send(boardList);
});

// /board 주소 POST 요청 시 새 게시글 생성 및 추가
app.post('/board', (req, res) => {
    // 게시글 객체 생성
    const board = {
        // id는 현재 게시글 수 + 1
        "id": ++numOfBoard,
        // user_id는 요청으로 전송된 user_id 파라미터 값
        "user_id": req.body.user_id,
        // date는 현재 날짜
        "date": new Date(),
        // title은 요청으로 전송된 title 파라미터 값
        "title": req.body.title,
        // content는 요청으로 전송된 conetent 파라미터 값
        "content": req.body.content
    };
    // 생성한 게시글을 게시글 리스트에 추가
    boardList.push(board);

    // /board URL로 리다이렉트(/board GET 요청 수행)
    res.redirect('/board');
})

// /board/{id} 주소 PUT 요청 시 {id}에 해당하는 게시글 수정
app.put('/board/:id', (req, res) => {
    // req.params.id 값 찾아 리스트에서 삭제
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id;
    });
    // 삭제할 id에 해당하는 게시글 인덱스 찾아서 게시글 리스트에서 삭제
    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    // 리스트에 새로운 요소 추가
    const board = {
        // id는 요청으로 전송된 id 파라미터 값
        "id": +req.params.id,
        // user_id는 요청으로 전송된 user_id 값
        "user_id": req.params.user_id,
        // date는 현재 날짜
        "date": new Date(),
        // title은 요청으로 전송된 title 값
        "title": req.body.title,
        // content는 요청으로 전송된 content 값
        "content": req.body.content
    };
    // 새로 생성한 게시글을 게시글 리스트에 추가
    boardList.push(board);

    // /board URL로 리다이렉트(/board GET 요청 수행)
    req.redirect('/board');
});

// /board/{id} 주소 DELETE 요청 시 {id}에 해당하는 게시글 삭제
app.delete('/board/:id', (req, res) => {
    // req.params.id 값 찾아 리스트에서 삭제
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id
    });
    // 삭제할 id에 해당하는 게시글 인덱스 찾아서 게시글 리스트에서 삭제
    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    // /board URL로 리다이렉트(/board GET 요청 수행)
    res.redirect('/board');
});

// 지정한 포트에서 클라이언트 연결 및 로그 출력
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
})


/* 
이걸 테스트하려면 curl 명령어를 사용하거나 Postman 같은 API 테스트 자동화 도구를 이용해야 함
테스트는 귀찮으니 나중에
ㅈ버그 터져도 난 모름
*/
// cors 모듈 설치

// 모듈 로드
const morgan = require('morgan');
const url = require('url');
const uuidAPIkey = require('uuid-apikey');
const cors = require('cors');   // cors 임포트

/* express app generate */
const express = require('express');
const app = express();

/* 포트 설정 */
app.set('port', process.env.PORT || 8080);

/* 공통 미들웨어 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());    // 모든 라우터에 cors 적용

/* 테스트를 위한 API키 */
// uuid_apikey.js에서 생성한 apikey와 uuid 사용
const key = {
    apiKey: 'PB5ZG27-AWG4QT6-MDWGCQW-3KX8A1K',
    uuid: 'b2cbf808-5720-4be8-a379-065f1cfa8506'
};

/* 테스트를 위한 게시글 데이터 */
// DB 대신 전역변수 사용
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

// /board 주소 POST 요청 시 현재 게시글 데이터를 응답으로 전송
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
        // content는 요청으로 전송된 content 파라미터 값
        "content": req.body.content
    };
    // 생성한 게시글을 게시글 리스트에 추가
    boardList.push(board);

    // /board URL로 리다이렉트(/board GET 요청 수행)
    res.redirect('/board');
});

// /board/{id} 주소 PUT 요청 시 {id}에 해당하는 게시글 수정
app.put('/board/:id', (req, res) => {
    // req.params.id 값 찾아 리스트에서 삭제
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id
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
    res.redirect('/board');
});

// /board/{id} 주소 DELETE 요청 시 {id}에 해당하는 게시글 삭제
app.delete('/board:id', (req, res) => {
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

/* 게시글 검색 API using uuid-key */
// /board/{apikey}/{type} GET 요청 시 파라미터에 따른 작업 수행
app.get('/board/:apikey/:type', (req, res) => {
    // URL 파라미터로 받아온 값 변수로 저장
    let {type, apikey} = req.params;
    // 요청 주소 뒤에 ?key=value 형식 url 쿼리스트링 받을 시 해당 쿼리스트링을 파싱하여 변수로 저장
    const queryData = url.parse(req.url, true).query;

    // 파라미터로 받아온 apikey가 uuidAPIkey에 존재하고(발급한 키이고) uuid와 짝이 맞을 시
    if (uuidAPIkey.isAPIKey(apikey) && uuidAPIkey.check(apikey, key.uuid)) {
        // 파라미터 type이 'search'이면
        if (type == 'search') { // 키워드로 게시글 탐색
            // 파싱된 쿼리스트링에서 키워드와 게시글을 추출하여 키워드가 제목에 포함된 게시물을 응답 결과로 전송
            const keyword = queryData.keyword;
            const result = boardList.filter((e) => {
                return e.title.includes(keyword)
            })
            res.send(result);
        }
        // 파라미터 type이 'user'이면
        else if (type == 'user') {  // 닉네임으로 게시글 검색
            // 파싱된 쿼리스트링에서 유저 아이디와 게시글을 추출하여 유저 아이디와 같은 게시물을 응답 결과로 전송
            const user_id = queryData.user_id;
            const result = boardList.filter((e) => {
                return e.user_id === user_id;
            });
            res.send(result);
        }
        // 받은 파라미터가 정의되지 않은 값이면 Wrong URL 문자열을 응답으로 전송
        else {
            res.send('Wrong URL');
        }
    }
    // 받아온 파라미터 apikey값이 발급된 적 없는 키이거나 uuid와 매칭되지 않을 시 Wrong API Key 문자열을 응답으로 전송
    else {
        res.send('Wrong API Key');
    }
});

/* 서버와 포트 연결 ..*/
// 지정한 포트에서 클라이언트 연결 및 로그 출력
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
})

/*
npm의 cor 모듈을 이용하여 cors를 모든 라우터가 지나갈 수 있게 등록하면 CORS 오류는 발생하지 않음
cors가 특정 라우터에만 지나가도록 적용하는 것도 가능
*/
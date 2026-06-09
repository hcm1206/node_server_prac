// requset 모듈로 네이버 API 사용해보기

/*
API(Application Programming Interface) : 응용 프로그램 사이의 소통 방법
*/

// 모듈 임포트
const morgan = require('morgan');
const request = require('request');
const express = require('express');
const app = express();

/* 포트 설정 */
app.set('port', process.env.PORT || 8080);

/* 공통 미들웨어 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/* 라우팅 설정 */
// '/naver/news' 라우팅 처리(GET 요청)
app.get('/naver/news', (req, res) => {
    // API 파라미터 설정
    const client_id = '검열됨';
    const client_secret = '검열됨';
    // 코스피에 대한 네이버 뉴스 검색 결과 요청 API 링크
    const api_url = 'https://openapi.naver.com/v1/search/news?query=' + encodeURI('코스피'); // encodeURI(req.query.query);
    const option = {
    };
    // API 정보 객체 생성
    const options = {
        url: api_url,
        qs: option,
        headers: { 'X-Naver-Client-Id': client_id,
                   'X-Naver-Client-Secret': client_secret },
    };

    // 네이버 API 요청에 대한 응답을 수신
    request.get(options, (error, response, body) => {
        // 오류가 없고 상태코드가 200으로 정상 수신이라면
        if (!error && response.statusCode == 200) {
            // 뉴스 검색 결과를 JSON 형태의 body 객체를 파싱해서 가져옴
            let newsItem = JSON.parse(body).items;
            // items - title, link, description, pubDate
            // 뉴스 정보를 저장하기 위한 객체 생성
            const newsJson = {
                title: [],
                link: [],
                description: [],
                pubDate: []
            }
            // 뉴스 검색 결과들을 가져와 각각 뉴스 정보 객체(newsJson)에 추가
            for (let i = 0; i < newsItem.length; i++) {
                newsJson.title.push(newsItem[i].title.replace
                                    (/(<([^>]+)>)|&quot;/ig, ""));
                newsJson.link.push(newsItem[i].link);
                newsJson.description.push(newsItem[i].description.replace
                                            (/(<([^>]+)>)|&quot;/ig, ""));
                newsJson.pubDate.push(newsItem[i].pubDate);
            }
            // 뉴스 정보 객체를 JSON 형식으로 클라이언트에게 응답 
            res.json(newsJson);
            // 네이버 API 요청 중 오류 발생 시 오류 내용 콘솔에 출력
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

/* 서버와 포트 연결.. */
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});

/*
request 모듈은 http 클라이언트 라이브러리 중 가장 오래된 모듈이며
request는 deprecated된 상태(유지보수 업데이트 중단)
*/
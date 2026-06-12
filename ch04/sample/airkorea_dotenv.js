// dotenv 모듈 적용

// 모듈 로드
const path = require('path');     // 파일 경로 설정 위한 path 모듈
const dotenv = require('dotenv'); // dotenv 모듈
// dotenv 경로 설정
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();

/* 포트 설정 */
app.set('port', process.env.PORT);

/* 공통 미들웨어 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 라우팅 설정 */
app.get('/airkorea', async (req, res) => {
    // .env 파일에 별도로 저장된 서비스 키를 로드하여 사용
    const serviceKey = process.env.airServiceKey;
    // API 기본 URL
    const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";
    
    // API 파라미터 설정
    let params = encodeURI('serviceKey') + '=' + serviceKey;                // API 발급 서비스 키
    params += '&' + encodeURI('numOfRows') + '=' + encodeURI('1');          // 행 개수(1개 행)
    params += '&' + encodeURI('pageNo') + '=' + encodeURI('1');             // 페이지 번호(1번 페이지)
    params += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');       // 주기(일일 날씨)
    params += '&' + encodeURI('ver') + '=' + encodeURI('1.3');              // 버전(1.3)
    params += '&' + encodeURI('stationName') + '=' + encodeURI('용산구');   // 지역(용산구)
    params += '&' + encodeURI('returnType') + '=' + encodeURI('json');      // 반환 타입(json 형식)

    // API 기본 URL + 파라미터 = 최종 요청 API URL
    const url = airUrl + params;

    try {
        // API 요청 후 응답 수신(비동기 처리)
        const result = await axios.get(url);
        // 수신한 응답 json 형식 파생
        res.json(result.data); // .data
    // 오류 발생 시 오류로그 콘솔에 출력
    } catch (error) {
        console.log(error);
    }
});

/* 서버와 포트 연결.. */
// 지정한 포트에 클라이언트 연결
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});

/*
API key와 같은 노출되면 안되는 보안 정보나 환경변수 등은 코드에 직접 넣기보다는
파일을 따로 분리하여 관리하는 것이 좋음 
dotenv 모듈은 이러한 데이터 관리에 사용되는 모듈
*/
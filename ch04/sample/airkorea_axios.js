// axios 모듈로 에어코리아 API 사용해보기

// 모듈 로드
const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();

/* 포트 설정 */
app.set('port', process.env.PORT || 8080);

/* 공통 미들웨어 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 라우팅 설정 */
// '/airkorea' 주소 라우팅
app.get('/airkorea', async (req, res) => {
    // 발급받은 API 서비스 키
    const serviceKey = "검열됨";
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
URL에 옵션, 파라미터 등을 포함하여 한꺼번에 전송 가능
axios로 받은 결과는 뒤에 .data를 붙여서 응답 데이터 값을 가져와야 함

API를 통해 응답 결과(result)를 받는 과정은 시간이 걸리기 때문에 async/await 처리를 하여 응답 결과가 오기를 대기해야 함
그렇지 않을 시 응답이 아직 들어오지 않은 빈 객체 상태인 result 부분이 json 파싱되어 전송하게 됨
*/

/*
위 결과는 응답으로 받은 json 데이터 전체를 표시하는데, 이 중에서 필요한 정보만 추출하는 작업 필요
*/
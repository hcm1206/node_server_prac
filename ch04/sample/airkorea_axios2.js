// 에어코리아 API 응답 결과 가져오기

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
app.use(express.urlencoded({ extended: true}));

/* 라우팅 설정 */
// '/airkorea/detail' URL GET 요청받을 시 수행할 asncy 함수 정의
app.get('/airkorea/detail', async (req, res) => {
    // 발급받은 API 서비스 키
    const serviceKey = "검열됨";
    // API 요청 기본 URL
    const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";

    // API 파라미터 설정
    let params = encodeURI('serviceKey') + '=' + serviceKey;                // 서비스 키
    params += '&' + encodeURI('numOfRows') + '=' + encodeURI('1');          // 행 번호(1번쨰 행)
    params += '&' + encodeURI('pageNo') + '=' + encodeURI('1');             // 페이지 번호(1번째 페이지)
    params += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');       // 날씨 기간(일일 날씨)
    params += '&' + encodeURI('ver') + '=' + encodeURI('1.3');              // 오퍼레이션 버전(1.3)
    params += '&' + encodeURI('stationName') + '=' + encodeURI('성북구');   // 지역(성북구)
    params += '&' + encodeURI('returnType') + '=' + encodeURI('json');      // 반환받을 데이터 타입(json)

    // 기본 URL + 파라미터 추가한 최종 요청 API
    const url = airUrl + params;

    try {
        // API 요청 후 응답 결과 받기(비동기 처리)
        const result = await axios.get(url);
        // API 응답 데이터 중 시간대, 미세먼지 수치, 초미세먼지 수치만 따와서 객체로 저장
        const airItem = {
            "location": '성북구', // 지역은 요청 데이터로 보낸거고 응답데이터로 받은 값이 아니므로 직접 설정
            "time": result.data.response.body.items[0]['dataTime'],    // 시간대
            "pm10": result.data.response.body.items[0]['pm10Value'],   // pm10 수치
            "pm25": result.data.response.body.items[0]['pm25Value']    // pm25 수치
        }
        // 가공 데이터 저장할 출력 배열 생성
        const badAir = [];
        // pm10은 미세먼지 수치
        // 미세먼지(pm10)가 30 이하이면 미세먼지 좋음을 출력 배열에 추가
        if (airItem.pm10 <= 30) {
            badAir.push('좋음☺️☺️');    
        }
        // 미세먼지(pm10)가 30 초과 80 이하이면 미세먼지 보통을 출력 배열에 추가
        else if (airItem.pm10 > 30 && airItem.pm10 <= 80) {
            badAir.push('보통😑😑');
        }
        // 미세먼지(pm10)가 80 초과이면 미세먼지 나쁨을 출력 배열에 추가
        else {
            badAir.push('나쁨☹️☹️');
        }
        
        // pm25는 초미세먼지 수치
        // 초미세먼지(pm25)가 15 이하이면 초미세먼지 좋음을 출력 배열에 추가
        if (airItem.pm25 <= 15) {
            badAir.push('좋음☺️☺️');
        }
        // 초미세먼지(pm25)가 15 초과 35 이하이면 초미세먼지 보통을 출력 배열에 추가
        else if (airItem.pm25 > 15 && airItem.pm25 <= 35) {
            badAir.push('보통😑😑');            
        }
        // 초미세먼지(pm25)가 35 초과이면 초미세먼지 나쁨을 출력 배열에 추가
        else {
            badAir.push('나쁨☹️☹️');
        }
        // 미세먼지 관측 지역과 API 응답으로 받은 관측 시간, API 응답 데이터를 가공한 미세먼지/초미세먼지 출력 데이터(좋음, 보통, 나쁨)을 URL GET 요청에 대한 응답으로 전송
        res.send(`관측 지역: ${airItem.location} / 관측 시간: ${airItem.time} <br> 미세먼지 ${badAir[0]} 초미세먼지 ${badAir[1]} 입니다.`);
    // 오류 발생 시 오류 로그 출력
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
응답 결과에서 지역 정보가 담긴 위치는 data -> ArptnInfoInqireSvcVo -> stationName
json 데이터로 받아오는 위치는 result.data.ArpltnInfoInquireSvcVo["stationName"]

미세먼지 수치인 pm10, 초미세먼지 수치인 pm25, 시간대를 나타내는 dateTime 값도 마찬가지로 추출하여 변수에 입력
*/
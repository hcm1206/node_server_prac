// 에어코리아 API 응답 코드에 캐시 저굥하기

// 모듈 로드
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
const morgan = require('morgan');
const axios = require('axios');

/* express app generate */
// express 앱 생성
const express = require('express');
const app = express();

/* redis connect */
// redis 모듈 로드
const redis = require('redis');
// localhost 6379 포트로 redis 접속
const client = redis.createClient(6379, '127.0.0.1');
// redis 에러 발생 시 콘솔 출력
client.on('error', (err) => {
    console.log('Redis Error : ' + err);
});

/* 포트 설정 */
// express 앱 서버 포트 지정
app.set('port', process.env.PORT);

/* 공통 미들웨어 */
// morgan 미들웨어, json 미들웨어, urlencoded 미들웨어 사용
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 라우팅 설정 */
// /airkorea 주소 라우팅 처리
app.get('/airkorea', async (req, res) => {
    // redis에서 'airItems' 이름으로 저장된 List 자료구조의 전체 범위 가져오기
    await client.lrange('airItems', 0, -1, async (err, cachedItems) => {
        // 에러 발생 시 에러 throw
        if (err) throw err;
        // redis에서 가져온 List에 값이 존재한다면(List 길이가 1 이상이면)
        if (cachedItems.length) { // data in cache
            // 캐시에 데이터가 있다고 출력 후 캐시 내용 출력
            res.send(` 데이터가 캐시에 있습니다. <br>
                관측 지역 : ${cachedItems[0]} / 관측 시간: ${cachedItems[1]} <br>
                미세먼지 ${cachedItems[2]} 초미세먼지 ${cachedItems[3]} 입니다.`);
                client.del('airItems'); // 디버깅용 Red 데이터 삭제 코드
        // redis에서 가져온 List에 값이 없으면(List 길이가 0이라면)
        } else { // data not in cache
            // 에어코리아 API 서비스키 및 API 호출 기본 URL 설정
            const serviceKey = process.env.airServiceKey;
            const airUrl = "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";
            // 에어코리아 API 파라미터 설정
            let params = encodeURI('serviceKey') + "=" + serviceKey;
            params += '&' + encodeURI('numOfRows') + "=" + encodeURI('1');
            params += '&' + encodeURI('pageNo') + "=" + encodeURI('1');
            params += '&' + encodeURI('dataTerm') + "=" + encodeURI('DAILY');
            params += '&' + encodeURI('ver') + "=" + encodeURI('1.3');
            params += '&' + encodeURI('stationName') + "=" + encodeURI('종로구');
            params += '&' + encodeURI('returnType') + "=" + encodeURI('json');

            // 최종 요청 API URL 설정
            const url = airUrl + params;

            // 아래 내용 시도
            try {
                // URL을 통해 API 요청 후 받은 응답 저장
                const result = await axios.get(url);
                // API 요청으로 받은 값 중 필요한 정보를 추출하여 airItem 객체로 저장
                const airItem = {
                    "location": "종로구", // 지역
                    "time": result.data.response.body.items[0]['dataTime'], // 시간대
                    "pm10": result.data.response.body.items[0]['pm10Value'], // pm10 수치
                    "pm25": result.data.response.body.items[0]['pm25Value'], // pm25 수치
                }
                // 미세먼지/초미세먼지 등급을 저장할 배열 생성 후 미세먼지/초미세먼지 수치에 따른 등급 정보 저장
                const badAir = [];
                // pm10은 미세먼지 수치
                if (airItem.pm10 <= 30) {
                    badAir.push("좋음☺️☺️");
                } else if (airItem.pm10 > 30 && airItem.pm10 <= 80) {
                    badAir.push("보통😑😑");
                } else {
                    badAir.push("나쁨☹️☹️");
                }

                // pm25는 초미세먼지 수치
                if (airItem.pm25 <= 15) {
                    badAir.push("좋음☺️☺️");
                } else if (airItem.pm25 > 15 && airItem.pm25 <= 35) {
                    badAir.push("보통😑😑");
                } else {
                    badAir.push("나쁨☹️☹️");
                }
                
                // 측정 장소와 시간, 미세먼지/초미세먼지 수치를 캐시로 사용하기 위해 배열로 저장
                const airItems = [airItem.location, airItem.time, badAir[0], badAir[1]];
                // 캐시 배열의 각 값을 redis에 List 원소로 저장
                airItems.forEach((val) => {
                    client.rpush('airItems', val); // redis에 저장
                });
                // redis 데이터 유효 시간 설정(60초 * 60 = 60분 뒤 소멸)
                client.expire('airItems', 60 * 60);
                
                // 캐시된 데이터 없다고 출력
                res.send("캐시된 데이터가 없습니다.");
            // 오류 발생 시 로그 출력
            } catch (error) {
                console.log(error);
            }
        }
    })
});

/* 서버와 포트 연결.. */
// 설정한 포트번호에서 클라이언트 연결
app.listen(app.get('port'), () => {
    console.log(app.get('port'), "번 포트에서 서버 실행 중 ..");
})
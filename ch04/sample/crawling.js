// 웹 페이지 크롤링

// 모듈 로드
const axios = require("axios");
const cheerio = require("cheerio");

// roadbook 웹페이지 HTML 정보 쌀먹 시도하는 함수
const getHtml = async () => {
    try {
        return await axios.get("https://roadbook.co.kr/category/%EC%8B%A0%EA%B0%84%EC%86%8C%EA%B0%9C");
    } catch (error) {
        console.error(error);
    }
};

// roadbook 웹페이지의 신간소개 페이지 GET요청
getHtml()
    .then(html => {
        // 신간소개의 각 항목(책) 정보 저장할 빈 배열(ulList) 생성
        let ulList = [];
        // html 정보 로드
        const $ = cheerio.load(html.data);
        // id가 searchList인 div 태그 소속 ol 태그 소속 li 태그 정보 가져옴
        const $bodyList = $("div#searchList ol").children("li");

        // li 태그 내 각 a 태그들마다 반복
        $bodyList.each(function (i, elem) {
            // 배열에 a 태그 텍스트를 bookList 값으로, 와 a태그의 href 속성 텍스트를 url 값으로 하는 객체를 원소로 추가
            ulList[i] = {
                bookList: $(this).find('a').text(),
                url: $(this).find('a').attr('href'),
            };
        });

        // ulList의 원소값 중 bookList가 비어있지 않은 원소만 필터링하여 저장(bookList 값이 비어있으면 배열에서 제거)
        const data = ulList.filter(n => n.bookList);
        return data;
    })
    // 리턴된 데이터(ulList 배열) 받아서 콘솔 출력
    .then(res => console.log(res));


/*
cheerio 모듈 사용 중 오류가 발생해서 보니까 nodejs 구버전은 지원되지 않는다하여
원래 쓰던 16버전을 갖다버리고 채신 24버전으로 재설치함
*/
// 쿠키 전달

// http 모듈 로드
const http = require('http');

// 서버 생성
http.createServer((req, res) => {
    // name=정상화 키-쌍의 쿠키 설정하여 헤더에 저장
    res.writeHead(200, { 'Set-cookie': 'name=JungSangHwa' });
    // 요청 헤더의 쿠키값 로그로 출력
    console.log(req.headers.cookie);
    // 응답 종료
    res.end('Cookie --> Header');
})
    // 8080 포트에서 클라이언트 연결 및 서버 실행
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결 중 ..');
    });

/*
개발자 도구의 [Network] 탭에서 [localhost]를 누르고 [Headers] 탭을 보면
클라이언트 Response Header에 쿠키가 전달 된 것을 확인 가능
*/


/*
클라이언트가 요청을 보낼 때마다 키-쌍으로 구성된 쿠키를 보내고
서버에서는 클라이언트가 보낸 쿠키를 읽어 사용자를 식별 가능

처음 한 번만 서버에서 res.writeHead() 메서드를 통해 Set-cookie에 값을 넣어 주면
브라우저에서 쿠키가 헤더에 저장되어 설정되고 이후에는 브라우저에서 자동으로 요청 시마다 쿠키를 서버에게 전송
*/
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

/* 포트 설정 */
app.set('port', process.env.PORT || 8080);

/* 공통 미들웨어 */
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser('1q2w3e4r'));  // 암호화된 쿠키를 사용하기 위한 임의의 문자 전송
app.use(session({
    secret: '1q2w3e4r',          // 암호화
    resave: false,               // 새로운 요청 시 세션에 변동 사항이 없어도 다시 저장할지 설정
    saveUninitialized: true,     // 세션에 저장할 내용이 없어도 저장할지 설정
    cookie: {
    // 세션 쿠키 옵션들 설정 httpOnly, expires, domain, path, secure, sameSite
        httpOnly: true,     // 로그인 구현 시 필수 적용, 자바스크립트로 접근 할 수 없게 하는 기능
    },
    // name: 'connect.sid'  // 세션 쿠키의 Name 지정 default가 connect.sid
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 라우팅 설정 */
// 루트 주소로 GET 요청 시
app.get('/', (req, res) => {
    // 세션이 존재한다면 로그인으로 취급하여 세션 이름(사용자명이라고 가정) 출력
    if (req.session.name) {
        const output = `
            <h2>로그인한 사용자님</h2><br>
            <p>${req.session.name}님 안녕하세요.</p><br>
        `
        res.send(output);
    // 세션이 없으면 로그인하지 않은 것으로 취급
    } else {
        const output = `
            <h2>로그인하지 않은 사용자입니다.</h2><br>
            <p>로그인 해주세요.</p><br>
        `
        res.send(output);
    }
});

// 로그인 주소로 GET 요청 시 세션 지정
app.get('/login', (req, res) => {
    console.log(req.session);
    // 쿠키를 사용할 경우 쿠키에 값 설정
    // res.cookie(name, value, options)
    // 세션 쿠키를 사용할 경우
    req.session.name = '젠슨황';
    res.end('Login Ok');
});

// 로그아웃 주소로 GET 요청 시 세션 쿠키 삭제
app.get('/logout', (req, res) => {
    res.clearCookie('connect.sid'); // 세션 쿠키 삭제
    res.end('Logout Ok');
});

/* 서버와 포트 연결.. */
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});

/*
위 서버를 실행하면 아래 내용과 같이 동작

1. morgan 미들웨어를 장착하였으므로 서버 콘솔에 로그가 표시됨
2. cookie-parser와 express-session 미들웨어를 장착하여 /login 페이지 접속 시 쿠키 세션을 사용해 req.session.name 값을 지정
3. 안전한 쿠키 전송을 위해 cookie-parser의 secret 인자 값과 쿠키 세션의 값을 동일하게 설정하여 지정
4. express-session을 이용하여 req.session을 가짐으로써 req.session은 요청을 보낸 사람의 고유한 공간처럼 활용
5. / 페이지 접속 시
  5-1. req.session.name 값이 있으면 '로그인한 사용자님' 출력
  5-2. req.session.name 값이 없으면 '로그인하지 않은 사용자입니다' 출력
*/

/*
morgan, cookie-parser 등의 미들웨어에는 next() 함수가 내부에 내장되어 있으므로 자동으로 다음 미들웨어로 넘어감
단 static의 경우 next()가 없으므로 static을 거쳐야 하는 router라면 공통 미들웨어 순서를 잘 설정해야 함
*/
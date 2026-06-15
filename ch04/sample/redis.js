// Redis 서버 테스트 ①

// redis 모듈 로드
const redis = require('redis');
// localhost 6379 포트로 redis 서버 연결
const client = redis.createClient(6379, '127.0.0.1');

// Redis client 값을 얻어오기 위해 get() 함수를 사용하여 'myKey' 키에 대응하는 값을 받아와 출력
client.get('myKey', (err, value) => {
    console.log(value);
});

/*
위 코드는 redis 모듈 3.0 이하 버전 코드이고, redis 4.0 모듈 이상 버전은 API가 달라지므로 다른 코드를 사용해야 함
또한 redis 서버 버전에 따라서도 호환되는 redis 모듈 버전이 다르기 때문에 버전을 잘 맞춰서 적용
일단은 redis 모듈 3.0과 그에 호환되는 구버전 redis 서버를 사용
*/
// Redis 서버 테스트 ②

// redis 모듈 로드
const redis = require('redis');
// localhost 6370 포트로 redis 서버 연결
const client = redis.createClient(6379, '127.0.0.1');

// 기존 myKey 키 제거(기존에 myKey가 있는 상태로 아래 코드 실행 시 타입 에러 발생 가능)
client.del('myKey');
// myKey 키로 0, 1, 2를 List 자료구조를 사용하여 차례로 집어넣음
client.rpush('myKey', 0);
client.rpush('myKey', 1);
client.rpush('myKey', 2);

/*
Redis는 사용하는 자료구조에 따라 명령어가 조금씩 다름
* Key-String 자료구조
  get key : key의 value를 가져옴
  set key value : key에 value 저장
  del key : key를 삭제
* Key-List 자료구조
  lpush key value : list의 왼쪽으로 value를 입력
  rpush key value : list의 오른쪽으로 value를 입력
  lrange key s_idx e_idx : list의 s_idx ~ e_idx까지 값을 반환
  lpop key : 가장 왼쪽의 value를 빼냄
  rpop key : 가장 오른쪽의 value를 빼냄
* Key-Hash 자료구조
  hset key field value : key에서 field-value 쌍을 저장
  hget key field : key에서 field의 value를 반환
  hdel key field : key에서 field 삭제
  hlen key : field 개수 반환
  hgetAll key : field와 value 모두를 반환
  hkeys key : 모든 field 반환
  hvals key : 모든 value 반환
*/
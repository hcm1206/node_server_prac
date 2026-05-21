// 1번째 콘솔 출력
console.log('First Console');

// 0초 후 2번째 콘솔 출력(비동기 처리)
setTimeout(function() {
    console.log('Second Console');
}, 0);

// 3번째 콘솔 출력
console.log('Third Console');

/*
1 -> 3 -> 2 순으로 실행됨
2번째 콘솔 출력은 setTimeout() 함수에 포함되는데,
setTimeout() 함수는 비동기처리이므로 대기시간을 0초로 설정한다고 해도
동기 처리가 먼저 다 끝난 후에 비동기 처리를 수행하기 때문에
동기 처리인 3번째 콘솔 출력이 끝난 후 비동기 처리인 2번째 콘솔 출력이 처리되기 때문
*/
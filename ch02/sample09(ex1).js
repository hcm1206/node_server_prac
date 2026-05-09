// 배열 내장 함수

// 야구 슨슈 배열 선언 및 초기화(MLB 코리안리거 야슈들)
let player = ["Lee", "Kim", "Song"];
// 축구 슨슈 배열 선언 및 초기화

/* foreach() : for문을 짧게 줄임 */
console.log("=== .foreach() ===");
// 야구 슨슈 배열의 각 원소(슨슈)를 p 변수로 순회
player.forEach(p => {
    // 각 원소값(슨슈 이름) p를 출력
    console.log(p)
});

/* indexOf() : 원소의 인덱스를 반환 */
console.log("=== .indexOf() ===");
// 야구 슨슈 배열에서 기메성의 인덱스(1) 출력
console.log(player.indexOf("Kim"));

/* findIndex() : 배열의 요소가 객체, 배열일 때(?) */
console.log("=== .findIndex() ===");
/* findIndex 인자로 들어온 콜백 함수의 조건을 만족하는 원소 인덱스 중 가장 작은 인덱스 반환, 없으면 -1 반환 */
// 슨슈 배열에서 원소 길이가 4인 원소(송성문)의 인덱스(4) 출력
console.log(player.findIndex(p => p.length == 4));

/* shift() : 첫 번째 원소 제거 및 반환 */
console.log("=== .shift() ===");
// 슨슈 배열에서 첫 번째 원소(리정후) 제거 및 반환
console.log(player.shift());
// 제거한 후 슨슈 배열을 보면 기메성과 송성문만 남음
console.log(player);

/* unshift() : 맨 앞에 새 원소를 추가 */
/* 반환되는 값은 원소 추가 후 배열 길이 */
console.log("=== .unshift() ===");
// 슨슈 배열의 맨 앞에 류뚱 추가(추가 후 배열 길이(3) 출력)
console.log(player.unshift("Ryu"));
// 추가 후 슨슈 배열을 보면 맨 앞에 류뚱이 추가됨
console.log(player);

/* join() : 배열 요소를 문자열로 합침 */
console.log("=== .join() ===")
// 배열 요소들을 하나로 합친 문자열 출력(원소는 콤마(,)로 구분됨, 원본 배열은 변경되지 않음)
console.log(player.join());

/* map() : 배열 각 요소 반환 */
/* 배열 각 요소들을 순회하며 반환하며, 인자로 들어간 콜백함수의 작업을 수행한 결괏값 반환 가능 */
console.log("=== .map() ===");
// player의 각 슨슈 원소 앞에 "player " 문자를 추가한 값이 저장된 배열 출력
console.log(player.map(p => "player " + p));

/* find() : 찾은 값을 반환 */
console.log("=== .find() ===");
/* find 인자로 들어온 콜백 함수의 조건을 만족하는 원소 중 인덱스가 가장 작은 원소 값 반환 */
// 슨슈 배열에서 원소 길이가 3인 원소 중 가장 인덱스가 작은 원소값(류뚱) 반환
console.log(player.find(p => p.length == 3));

/* filter() : 조건을 만족하는 배열 생성 */
console.log("=== .filter() ===");
/* filter 인자로 들어온 콜백함수의 조건을 만족하는 원소로 구성된 배열 반환 */
// 슨슈 배열에서 슨슈 이름 길이가 3인 원소값으로 이루어진 배열(류뚱, 기메성) 출력
console.log(player.filter(p => p.length == 3));

/* splice() : 인덱스로 특정 항목을 제거 */
console.log("=== .splice() ===");
// 슨슈 배열의 2번째 인덱스 원소(송성문) 제거
player.splice(2);
// 송성문이 제거된 슨슈 배열 출력
console.log(player);

/* slice() : 항목을 제거해 새 배열 생성 */
console.log("=== .slice() ===");
// 슨슈 배열에서 [0, 1) 범위 인덱스에 해당하는 원소로 구성된 배열 출력(0번째 류뚱 원소만 있는 배열 출력됨)
console.log(player.slice(0, 1));

/* pop() : 마지막 원소 제거 및 반환 */
console.log("=== .pop() ===")
// 슨슈 배열의 마지막 원소(기메성) 제거 및 출력
console.log(player.pop());
// 기메성이 제거된 슨슈 배열 출력
console.log(player);

/* concat : 배열 합침 */
console.log("=== .concat() ===");
// 기존 슨슈 배열과 박찬호, 추신수가 원소로 있는 또다른 배열을 합친 배열을 슨슈 배열로 재할당
player = player.concat(["Park", "Chu"]);
// 재할당된 배열 출력
console.log(player);

/* reduce() : 누적 값을 계산 */
console.log("=== .reduce() ===");
/* (누적할 값, 원소)를 인자로 받는 콜백 함수를 통해 값을 누적 후 누적 값을 반환 */
// players에 슨슈 배열 원소(슨슈명)을 누적하여 더한(추가한) 값을 출력(류박추)
console.log(player.reduce((players, p) => players + p));

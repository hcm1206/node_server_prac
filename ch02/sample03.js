// function-level-scope의 사용 ①

/*
스코프(Scope) : '범위'라는 뜻으로 변수에 접근할 수 있는 범위를 의미
function-level-scope란 함수의 블록 범위 내에서 선언한 변수는 함수 내에서만 인정하고 
함수 외부에서 선언한 변수는 모두 전역변수가 된다는 뜻

var는 function-level-scope를 따르므로
전역변수에 원하지 않는 값을 덮어쓸 수 있음
-> 뭔 말이냐면 var는 함수 중괄호문 {} 끼리만 독립적이고 나머지는 다 같은 변수로 취급하기 때문에
   제어문, 반복문, 단순 중괄호문 {} 블록 내부와 외부를 구분하지 않음
*/

// 견공 자제 변수 선언 및 "cute" 저장
var puppy = "cute";
// 견공 자제 출력 : 당연히 cute가 나옴
console.log(puppy);
{
    // 블록 안에서 견공 자제 변수 선언 및 "so cute" 저장
    var puppy = "so cute";
}
// 블록 밖에서 견공 자제를 출력했는데 블록 안에서 저장했던 "so cute"가 출력됨 -> 염병!
console.log(puppy);
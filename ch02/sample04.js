// function-level-scope의 사용 ②

/*
const와 let은 block-level-scope
즉 블록 내부에서 선언된 변수는 외부에 영향을 끼치지 않음
*/

// 견공 자제 선언 및 "cute" 저장
let puppy = "cute";
{
    // 블록 내부에서 견공 자제 선언 및 "so cute" 저장
    let puppy = "so cute";
}
// 견공 자제를 출력해보면 블록 내부의 값이 아닌 블록 외부에서 선언한 값이 출력됨
console.log(puppy);
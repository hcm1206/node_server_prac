// Prototype Chaining

// 동물 객체 정의
const animal = {
    // 다리 4개
    leg: 4,
    // 꼬리 1개
    tail: 1,
    // 출력 함수 : 다리 4개와 꼬리 1개를 가졌다 꽥
    say() {
        console.log('I have 4 legs 1 tail');
    }
}

// 견공
const dog = {
    // 개소리: 왈
    sound: 'wang',
    // 견공은 햄복할수가 이써
    happy: true
}

// 견공의 프로토타입(부모) 객체는 동물
dog.__proto__ = animal;

// 떼껄룩
const cat = {
    // 괭이소리: 냥
    sound: 'yaong',
    // say() 메소드 오버라이딩 : "떼 껄 룩" 출력
    say() {
        console.log('Take a Look');
    }
}

// 떼껄룩의 프로토타입(부모) 객체는 견공
cat.__proto__ = dog;

// 떼껄룩이 행복한가? -> 예 (떼껄룩에는 햅삐 프로퍼티가 없으나 상속받은 견공의 햅삐 프로퍼티를 사용하여 출력)
console.log(cat.happy);
// 떼껄룩의 다리 개수 -> 4개 
// (떼껄룩은 다리 프로퍼티가 없고 부모인 견공에도 다리 프로퍼티가 없으나 견공 부모인 동물에는 다리 프로퍼티가 있으니 그걸 사용)
console.log(cat.leg);
// say() 함수는 동물 객체에도 있으나 손자 객체인 떼껄룩에서 재정의(오버라이딩)한 함수를 사용
cat.say();

/*
Prototype Chaining : 상속을 체이닝하여 부모-자식-손주 관계와 같이 상속을 이을 수 있음
*/
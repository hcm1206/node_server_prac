// 프로토타입과 상속

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
    // 개소리 : 왈
    sound: 'wang'
}

// 떼껄룩
const cat = {
    // 괭이소리 : 냥
    sound: 'yaong'
}

// 견공의 프로토타입 객체를 동물로 지정(≒동물 객체 상속받는다)
dog.__proto__ = animal;
// 떼껄룩의 프로토타입 객체를 동물로 지정(≒동물 객체 상속받는다)
cat.__proto__ = animal

/*
위와 같이 프로토타입으로 객체지향의 '상속' 구현 가능
*/
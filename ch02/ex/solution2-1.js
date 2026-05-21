
// 객체 생성자 함수 정의
function MakeOrder(name, price) {
    // 인자로 받은 주문상품, 가격을 객체 인스턴스(this) 변수로 저장
   this.name = name;
   this.price = price;
}

// order1에 객체 생성자 함수를 통해 주문상품으로 '오렌지 쥬스', 가격으로 '2500'이 들어간 주문객체 저장
const order1 = new MakeOrder('오렌지 쥬스', '2500');
// order2에 객체 생성자 함수를 통해 주문상품으로 '토마토 쥬스', 가격으로 '3000'이 들어간 주문객체 저장
const order2 = new MakeOrder('토마토 쥬스', '3000');
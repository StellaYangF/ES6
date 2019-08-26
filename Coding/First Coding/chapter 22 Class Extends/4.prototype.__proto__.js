// 大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，
// 指向对应的构造函数的prototype属性。Class 作为构造函数的语法糖，
// 同时有prototype属性和__proto__属性，因此同时存在两条继承链。

// （1）子类的__proto__属性，表示构造函数的继承，总是指向【父类】。

// （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向【父类的prototype属性】。
class A {}
class B extends A {}

B.prototype.__proto__ === A.prototype;    // true
B.__proto__ === A   // true

// 上面代码中，子类B的__proto__属性指向父类A，子类B的prototype属性的__proto__属性指向父类A的prototype属性。

// 这样的结果是因为，类的继承是按照下面的模式实现的。

class A {}
class B extends A {}
// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);
// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

const b = new B();

// 《对象的扩展》一章给出过Object.setPrototypeOf方法的实现。
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

// 因此，就得到了上面的结果。
// 双重继承
Object.setPrototypeOf(B.prototype, A.prototype);
// equals to:
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
B.__proto__ = A;


// 这两条继承链，可以这样理解：
// 作为一个【对象】，子类（B）的原型（__proto__属性）是父类（A）；
// 作为一个【构造函数】，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。

B.prototype = Object.create(A.prototype);
// equals to
B.prototype.__proto__ = A.prototype;

// 上面代码的A，只要是一个有prototype属性的函数，就能被B继承。
// 由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数。

// 下面，讨论两种情况。第一种，子类继承Object类。

class A extends Object {}

A.prototype.__proto__ === Object.prototype;
A.__proto__ === Object;
// 这种情况下，A其实就是构造函数Object的复制，A的实例就是Object的实例。

// 第二种情况，不存在任何继承。

class A {}

A.__proto__ === Function.prototype;     //  true
A.prototype.__proto__ === Object.prototype;   //true
// 这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Function.prototype。
// 但是，A调用后返回一个空对象（即Object实例），所以A.prototype.__proto__指向构造函数（Object）的prototype属性。

// 实例的 __proto__ 属性
// 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。

class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}
class ColorPoint extends Point{
  constructor(x,y,color){
    super(x, y);
    this.color = color;
  }
}
let p1 = new Point(2,3);
let p2= new ColorPoint(2,3,'red');

p2.__proto__ === p1.__proto__;  //false;
p2.__proto__.__proto__ === p1.__proto__;  //true

// 因此，通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为。

p2.__proto__.__proto__.printName = function () {
  console.log('Ha');
};

p1.printName() // "Ha"

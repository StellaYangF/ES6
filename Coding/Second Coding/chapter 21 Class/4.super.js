// 1) super作为函数调用时 => Parent.prototype.constructor.call(this)，返回子类的实例
class A {
  constructor() {
    console.log(new.target.name)
  }
}

class B extends A {
  constructor() {
    super()
    // equals to 
    // A.prototype.constructor.call(this)
  }
}

let b = new B();   // new.target.name = A
let a = new A();   // new.target.name = B

// 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
class B extends A{
  constructor() {}
  m() {
    super()
  }
}

let b = new B();
// SyntaxError: 'super' keyword unexpected here


// 2) 在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
class A {
  b = "b"

  constructor() {
    this.a = "a"
    console.log(new.target.name)
  }

  c() {
    return "c";
  }
}
class B extends A{
  constructor() {
    super()      // super() => A.prototype.constructor.call(this)
    console.log(super.c());  // super => A.prototypes
  }

  get getAB() {
    // Note: 定义在父类上实例的方法和属性，无法通过super拿到
   console.log(super.a, super.b);
  }
}

let b = new B();
// B
// c
b.getAB
// undefined undefined
// super.a, super.b， a和b都是A的实例属性，取不到的


// ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  intro() {
    console.log(`Hello, I'm ${this.name} and I am ${this.age} years old. I am in Grage ${this.grade}`);
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  hello() {
    super.intro();
  }  
}

let tom = new Student("Tom", 3, 5);
tom.intro();
// Hello, I'm Tom and I am 3 years old. I am in Grage 5
tom.hello();
// Hello, I'm Tom and I am 3 years old. I am in Grage 5


// 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。
class Parent {
  static hello(msg) {
    console.log("static", msg);
  }

  hello(msg) {
    console.log("instance", msg);
  }
}

class Child extends Parent {
  static hello(msg) {
    super.hello(msg);
  }

  hello(msg) {
    super.hello(msg);
  }
}

Child.hello("hello");
// static hello
let child = new Child();
child.hello("hello");
// instance hello

// 在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例。
class A {
  constructor() {
    this.x = 1;
  }

  static print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }

  static x = 3   // 子类的静态属性

  static print () {  // 子类的静态方法
    super.print();   // 父类静态方法中的this指向当前子类B， 而非实例
  }
}

B.print();
// 3
// 基本上，ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的class改写，就是下面这样。
class Point {
  constructor (x, y) {
    this.y = y;
    this.x = x;
  }
  
  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

typeof Point;
// "function"
Point === Point.prototype.constructor;

// 构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。

class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};


// 由于方法都定义在prototype对象上，类的新方法可添加在prototype对象上，Object.assign可一次添加多个方法
class A {}
Object.assign(A.prototype, {
  toString() {},
  toValue() {},
})


// 类的内部所有定义的方法，都是不可枚举的（non-enumerable）。
// 1) 
class A {}
A.prototype.toString = arg => "toString" + arg;

a = new A();

for (let key in a) {
  console.log(key)
}


// 不用new执行，会报错
class A {
  constructor() {
    return this;
    // 默认返回实例对象
    return Object.create(null);
    // 设置返回其他
  }
}

A();

// ES5
function A() {

}
A();
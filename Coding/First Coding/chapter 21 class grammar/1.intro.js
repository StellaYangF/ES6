// 类的由来
// JavaScript 语言中，生成实例对象的传统方法是通过构造函数。下面是一个例子。

function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function() {
  return `(${this.x}, ${this.y})`;
};

// 上面这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大，很容易让新学习这门语言的程序员感到困惑。

// ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。

// 基本上，ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，
// 新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
// 上面的代码用 ES6 的class改写，就是下面这样。

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
// 上面代码定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，
// 而this关键字则代表实例对象。也就是说，ES5 的构造函数Point，对应 ES6 的Point类的构造方法。

// Point类除了构造方法，还定义了一个toString方法。
// 注意，定义“类”的方法的时候，前面不需要加上function这个关键字，
// 直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

// ES6 的类，完全可以看作构造函数的另一种写法。

// 上面代码表明，类的数据类型就是函数，类本身就指向构造函数。
// 使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。

let p = new Point(1, 2);
p.toString();

// 构造函数的prototype属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。

// 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
// Object.assign方法可以很方便地一次向类添加多个方法。
Object.assign(Point.prototype, {
  toValue() {
    return this.x + this.y;
  }
});
Point.prototype.toDouble = function() {
  this.x *= 2;
  this.y *= 2;
};

//prototype对象的constructor属性，直接指向“类”的本身，这与 ES5 的行为是一致的。

// 另外，类的【内部】所有定义的方法，都是不可枚举的（non-enumerable）。
// 外部可枚举
Object.keys(Point.prototype);
// 合并的toValue方法可以枚举？？
//  ["constructor", "toString", "toValue", "toDouble"]

Object.getOwnPropertyNames(Point.prototype);
//  ["constructor", "toString", "toValue", "toDouble"]

// 上面代码采用 ES5 的写法，toString方法就是可枚举的。

// constructor方法
// constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
// 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
class Point {}

// 等同于
class Point {
  constructor() {}
}
// 上面代码中，定义了一个空的类Point，JavaScript 引擎会自动为它添加一个空的constructor方法。

// constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo; //  false

// 上面代码中，constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。

// 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
Foo();
//  Uncaught TypeError: Class constructor Foo cannot be invoked without "new";

// 类的实例
// 生成类的实例的写法，与 ES5 完全一样，也是使用new命令。前面说过，如果忘记加上new，像函数那样调用Class，将会报错。

// 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x}: ${this.y})`;
  }
}

let point = new Point(2, 3);
point.toString();

point.hasOwnProperty("x"); // true
point.hasOwnProperty("x"); // true
point.hasOwnProperty("toString"); // false
point.__proto__.hasOwnProperty("toString"); // true

// __proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，
// 虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，
// 但依旧不建议在生产中使用该属性，避免对环境产生依赖。
// 生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。

// 取值函数（getter）和存值函数（setter）
// 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return "getter";
  }

  set prop(val) {
    console.log("setter: " + val);
  }
}
let inst = new MyClass();
inst.prop = 1; // setter: 1;
inst.prop; // 'getter' ;

// 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return "getter";
  }

  set prop(val) {
    console.log("setter: " + val);
  }
}
let inst = new MyClass();
inst.prop = 1; // setter: 1;
inst.prop; // 'getter' ;

let descriptor = Object.getOwnPropertyDescriptor(MyClass.prototype, "prop");
"get" in descriptor;
"set" in descriptor;

// 属性表达式
let methodName = "getArea";
class Square {
  constructor(length) {
    // ...
  }
  [methodName]() {}
}

// 属性表达式
// 与函数一样，类也可以使用表达式的形式定义。
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
// 上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是Me，
// 但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用。
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined

// 上面代码表示，Me只在 Class 内部有定义。

// 如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式。

const MyClass = class { /* ... */ };

// 采用 Class 表达式，可以写出立即执行的 Class。
let person = new class{
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}("张三");
person.sayName();

// 注意点

// （1）严格模式
// 类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。
// 只要你的代码写在类或模块之中，就只有严格模式可用。
// 考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

// （2）不存在提升
// 类不存在变量提升（hoist），这一点与 ES5 完全不同。
new Foo();    // RefereceError: Cannot access 'Foo' before initialization
class Foo{} 

// 上面代码中，Foo类使用在前，定义在后，这样会报错，因为 ES6 不会把类的声明提升到代码头部。
// 这种规定的原因与下文要提到的继承有关，必须保证子类在父类之后定义。

{
  let Foo = class {};
  class Bar extends Foo {
  }
}
// （3）name 属性
// 由于本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。
class Point{}
Point.name; //  Point
Point.prototype.constructor.name;   //Point
new Point().constructor.name;     //Point

// （4）Generator 方法
// 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
class Foo {
  constructor (...args){
    this.args = args;
  }
  * [Symbol.iterator]() {
    for(let arg of this.args){
      yield arg;
    }
  }
}
for(let x of new Foo("hello", "world")){
  console.log(x);
}
// hello
// world
// 上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。
// Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。

// （5）this 的指向
// 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
logger.printName(); //Hello there

// 上面代码中，printName方法中的this，默认指向Logger类的实例。
// 但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境
// （由于 class 【内部是严格模式】，所以 this 实际指向的是undefined），
// 从而导致找不到print方法而报错。

// 一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // Hello there

// 另一种解决方法是使用箭头函数。
class Obj {
  constructor () {
    this.getThis = () =>this;
  }
}
const obj1 = new Obj();
obj1.getThis() === obj1;    // true


// 还有一种解决方法是使用Proxy，获取方法的时候，自动绑定this。
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target , key){
      const value = Reflect.get(target, key);
      if(typeof value !== 'function')  return value;
      if(! cache.has(value)){
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}
const logger = selfish(new Logger());
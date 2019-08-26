// 原生构造函数的继承
// 原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。

/* 
  Boolean()
  Number()
  String()
  Array()
  Date()
  Function()
  RegExp()
  Error()
  Object()
*/

// 以前，这些原生构造函数是无法继承的，比如，不能自己定义一个Array的子类。

function MyArray () {
  Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor :{
    value : MyArray,
    writable: true,
    configurable: true,
    enumerable: true
  }
})

// ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，
// 然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。下面是一个继承Array的例子。
class MyArray extends Array {
  constructor(...args){
    super(...args);
  }
}

let arr = new MyArray();
arr[0] = 12;
arr.length ;  //

// 上面代码定义了一个MyArray类，继承了Array构造函数，
// 因此就可以从MyArray生成数组的实例。
// 这意味着，ES6 可以自定义原生数据结构（比如Array、String等）的子类，这是 ES5 无法做到的。

// 上面这个例子也说明，extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数。
// 因此可以在原生数据结构的基础上，定义自己的数据结构。下面就是定义了一个带版本功能的数组。

class VersionedArray extends Array{
  constructor(){
    super();
    this.history = [[]];
  }
  commit() {
    console.log(this);
    this.history.push(this.slice());
  }
  revert() {
    console.log(this.history[this.history.length-1]);
    this.splice(0, this.length, ...this.history[this.history.length -1]);
  }
}

let x = new VersionedArray();

// 上面代码中，VersionedArray会通过commit方法，将自己的当前状态生成一个版本快照，存入history属性。
// revert方法用来将数组重置为最新一次保存的版本。除此之外，VersionedArray依然是一个普通数组，
// 所有原生的数组方法都可以在它上面调用。

// 下面是一个自定义Error子类的例子，可以用来定制报错时的行为。

class ExtendableError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

class MyError extends ExtendableError{
  constructor(m) {
    super(m);
  }
}

let myerror = new MyError('11');
myerror.message;  
myerror instanceof Error;
myerror.name
myerror.stack

// 注意，继承Object的子类，有一个行为差异。

class NewObj extends Object {
  constructor () {
    super(...arguments);
  }
}
let o = new NewObj({attr: true});
o.attr === true;      // false
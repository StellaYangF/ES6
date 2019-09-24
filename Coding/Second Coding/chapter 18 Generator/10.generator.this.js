// Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。
function* gen() {};
gen.prototype.say = function () {
  return "Bonjour";
}
let g = gen()

g instanceof gen;   
// true
g.say();
// "Bonjour"

// 如果把`gen`当作普通的构造函数，并不会生效，因为`gen`返回的总是遍历器对象，而不是`this`对象。
function* gen () {
  console.log(this);
  this.a = 11;
}
let obj = gen();   
// 没有return默认为undefined
obj.next();
// this指向window
// {value: undefined, done: true}
// 为this添加的a，直接加到了window对象全局属性
obj.a 
// undifined


// `Generator` 函数也不能跟`new`命令一起用，会报错。直接调用就会返回实例
function* F() {
  yield this.x = 2;
  yield this.y = 3;
}
new F();
// Uncaught TypeError: F is not a constructor


// 变通方法
// 首先，生成一个空对象，使用call方法绑定 Generator 函数内部的this。这样，构造函数调用以后，这个空对象就是 Generator 函数的实例对象了。
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
let obj = {};
let f = F.call(obj);
// 这样添加的a, b, c属性都会在obj对象上
f.next();
// {value: 2, done: false}
f.next();
// {value: 3, done: false}
f.next();
// {value: undefined, done: true}
obj.a;
// 1
obj.b;
// 2
obj.c;
// 3

// - 变通方法二：
// 一个办法就是将`obj`换成`F.prototype`。将预添加的实例属性改为添加在实例的原型链上
function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
let f = F.call(F.prototype);
f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
F.prototype;
// Generator {a: 1, b: 2, c: 3}
Object.getPrototypeOf(f);
// Generator {a: 1, b: 2, c: 3}

// 再将`F`改成构造函数，就可以对它执行`new`命令了
function* gen() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}

function F() {
  return gen.call(gen.prototype);
}
let f = new F();
f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
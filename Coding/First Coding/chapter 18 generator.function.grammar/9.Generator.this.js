// Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，
// 也继承了 Generator 函数的prototype对象上的方法。

function* g() {}

g.prototype.hello = function() {
  return 'Hi!';
}
let obj = g();

obj instanceof g;
obj.hello();//Hi!
// 上面代码表明，Generator 函数g返回的遍历器obj，是g的实例，而且继承了g.prototype。
// 但是，如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象。

function* g() {
  this.a = 11;
}
let obj = g();
obj.next();   // {value: undefined, done: true}
obj.a;        // undefined
// 上面代码中，Generator 函数g在this对象上面添加了一个属性a，但是obj对象拿不到这个属性。

// Generator 函数也不能跟new命令一起用，会报错。

function* F() {
  yield this.x = 2;
  yield this.y = 3;
}

new F();
// TypeError: F is not a constructor


// 下面是一个变通方法。首先，生成一个空对象，使用call方法绑定 Generator 函数内部的this。
// 这样，构造函数调用以后，这个空对象就是 Generator 函数的实例对象了。
function* F(){
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
let obj = {};
let f = F.call(obj);

f.next();
// 上面代码中，首先是F内部的this对象绑定obj对象，然后调用它，返回一个 Iterator 对象。
// 这个对象执行三次next方法（因为F内部有两个yield表达式），完成 F 内部所有代码的运行。
// 这时，所有内部属性都绑定在obj对象上了，因此obj对象也就成了F的实例。

// 一个办法就是将obj换成F.prototype。
function* F(){
  this.a = 1;
  yield this.b =2;
  yield this.c = 3;
}
let f = F.call(F.prototype);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3

// 再将F改成构造函数，就可以对它执行new命令了。
function* gen() {
  this.a =1;  
  yield this.b = 2;
  yield this.c = 3;
}

function F(){
  return gen.call(gen.prototype);
}

let f = new F();
f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3
  

function* g() {
  try {
    yield;
  } catch (error) {
    console.log(`内部捕获: ${error}`)
  }
}

let it = g();
it.next();

try {
  it.throw("a");
  it.throw("b");
}  catch (error) {
  console.log(`外部捕获：${error}`);
}

// 内部捕获: a
// 外部捕获：b

// 内外均未部署try...catch时
function* gen () {
  yield console.log("hello");
  yield console.log("world");
}
let it = gen();
it.next();
it.throw();
// hello
// Uncaught undefined

// 内部至少捕获一次throw抛出的错误
function* gen() {
  try {
    yield 1;
  } catch (e) {
    console.log(e);
  }
}

let it = gen();
it.throw();
// uncaguth undefined

// `throw`方法捕获，也相同与调用了next方法，附带执行一条yield表达式
function* gen () {
  try {
    yield console.log(1);
  } catch (e) {
    console.log(e);
  }
  yield console.log(2);
  yield console.log(3)
}

let it = gen();
it.next();    // 1
it.throw('Oops! Something wrong.'); // "Oops! Somethign wrong!"2 
it.next(); // 3

// `throw` 与 `it.throw`方法无关，两者互补影响
function* gen () {
  yield console.log(1);
  yield console.log(2);
}
let it = gen();
it.next();

try {
  throw new Error("Something wrong!");
} catch (e) {
  it.next();
}
// 1 2

// Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的catch捕获。
function* gen () {
  let x = yield 2;
  let y = x.toUpperCase();
  yield y;
}
let it = gen();
it.next();  // { value: 2, done: false }
try {
  it.next(42);
} catch (error) {
  console.log('Oops!', error);  
}
// Uncaught TypeError: x.toUpperCase is not a function
// undefined

// 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。
function* gen () {
  yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke!');
  yield 2;
  yield 3;
}
function log(generator) {
  let v = undefined;
  console.log('Starting generator');
  try{
    v = generator.next();
    console.log('1st calls next method', v)
  } catch (e) {
    console.log('Catch error', v);
  }
  try{
    v = generator.next();   // 第二次的next并未执行
    console.log('2nd calls next method', v)
  } catch (e) {
    console.log('Catch error', v);
  }
  try{
    v = generator.next();
    console.log('3rd calls next method', v)
  } catch (e) {
    console.log('Catch error', v);
  }
  console.log('caller done');
}

log(gen());
// starting generator
// 第一次运行next方法 { value: 1, done: false }
// throwing an exception
// 捕捉错误 { value: 1, done: false }
// 第三次运行next方法 { value: undefined, done: true }
// caller done
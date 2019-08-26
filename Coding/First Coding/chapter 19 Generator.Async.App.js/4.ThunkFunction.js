// Thunk function exsited earlier in the 1960s
let x = 1;
function f(m) {
  return m * 2;
}
f(x + 5);

// call by  value: used by C language
// call by name: user by Haskell

// When the aim function doesn't use some param, call-by-value will waste qualibility
function f(m){
  return m * 2;
}

f(x + 5);

// equals to
let thunk = function () {
  return x + 5;
}

function f(thunk) {
  return thunk() *2 ;
}


// ES 5
let Thunk = function(fn){
  return function () {
    let args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  }
}

// ES 6
const Thunk = function(fn){
  return function(...args){
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  }
}

function f(a, cb){
  cb(a);
}
const ft = Thunk(f);
ft(1)(console.log);   // 1

// Thunnkidy
// 生产 环境的转换器，建议使用Thunkify模块
// 首先安装
// $ npm install thunkify
// 
let thunkify =  require('thunkify');
let fs = require('fs');

let read = thunkify(fs.readFile);
read('package.json')(function(err, str){
  // ...
 })

// Thunkify 的源码与上一节那个简单的转换器非常像。

// Generator 函数的流程管理
// 你可能会问， Thunk 函数有什么用？回答是以前确实没什么用，
// 但是 ES6 有了 Generator 函数，Thunk 函数现在可以用于 Generator 函数的自动流程管理。

// Generator 函数可以自动执行。
function* gen() {
  // ...
  yield 1;
  yield 2;
}

let g = gen ();
let res = g.next();

while(!res.done){
  console.log(res.value);
  res = g.next();
}
// 但是，这不适合异步操作。如果必须保证前一步执行完，才能执行后一步，上面的自动执行就不可行。
// 这时，Thunk 函数就能派上用处。以读取文件为例。下面的 Generator 函数封装了两个异步操作。

// Thunk 函数的自动流程管理
// Thunk 函数真正的威力，在于可以自动执行 Generator 函数。下面就是一个基于 Thunk 函数的 Generator 执行器。

function run(fn){
  let gen = fn();

  function next (err, data ){
    let result = gen.next(data);
    if(result.done) return;
    result.value(next);
  }
  next();
}
function* g(){}

run(g);

// 上面代码中，函数g封装了n个异步的读取文件操作，只要执行run函数，这些操作就会自动完成。
// 这样一来，异步操作不仅可以写得像同步操作，而且一行代码就可以执行。

// Thunk 函数并不是 Generator 函数自动执行的唯一方案。
// 因为自动执行的关键是，必须有一种机制，自动控制 Generator 函数的流程，接收和交还程序的执行权。
// 回调函数可以做到这一点，Promise 对象也可以做到这一点。


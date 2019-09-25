// 求值策略：
// call by value 传值调用
// call by name 传名调用

/* 编译器中的 传名调用 策略 替换表达式*/ 
function f(n) {
  return n * 2;
}

f(x+ 5);

// equals to 
let thunk = function () {
  return x + 5;
}

function f(thunk) {
  return thunk() *2;
}

/* js中的 传名调用 策略 替换多参数函数 => 单参数函数*/ 
const fs = require("fs");
// readFile (several params)  
fs.readFile(filename, callback);

// readFile in Thunk (single params)
let thunk = filename => callback => fs.readFile(filename, callback);
let readFileThunk = thunk(filename);
readFileThunk(callback);


// 任何函数，只要参数有callback，就能写成Thunk函数的形式
// ES5 version
let Thunk = fn => function() {
  let args = Array.prototype.slice.call(arguments);
  return callback => 
  {
    args.push(callback);
    return f.apply(this, args);
  }
}

// ES6 version
const Thunk = fn => (...args) => callback => fn.call(this, ...args, callback);

// application
function handler(a, b, callback) {
  console.log(`Receive params: ${a} ${b}`);
  callback(a, b);
  return 'done';
}

function callback(a, b) {
  console.log(a + b);
}

console.log(Thunk(handler)(1,2)(callback));
console.log(handler(1,2,callback));
// Receive params: 1 2
// 3
// done

// 例二
function f(a, cb) {
  cb(a);
}
const ft = Thunk(f);
ft(1)(console.log);   // 1


// Thunkify模块
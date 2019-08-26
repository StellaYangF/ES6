/* why use block scope???? */

// 1： 内层变量可能会覆盖外层变量
var tmp = new Date();
function f() {
  console.log(tmp); // undefined
  if (false) var tmp = "hello world";
}
f(); // undefined
// if代码块的外部使用外层的tmp变量，内部使用内层的tmp变量，但，函数f执行后，输出undefined,
// 原因：存在变量提升，导致内层的tmp变量覆盖了外层的tmp变量；

// 2： 用来计数的循环变量泄露为全局变量
var s = "hello";
for (vari = 0; i < s.length; i++) {
  console.log(s[i]);
}
console.log(i); // 5
// 变量i只用来控制循环，但循环结束后，并没有消失，泄露成了全局变量

// 3： ES6 的块级作用域
/************************ let实际上为javascript新增了块级作用域 ******************/
// ES6 允许块级作用域的任意嵌套
// 内层作用域可以定义外层作用域的同名变量
{
  {
    {
      {
        let insane = "Hello World";
        {
          let insane = "hello World";
        }
      }
    }
  }
}

// 4:  块级作用域的出现，实际上使得广泛应用的立即执行函数表达式(IIFE)不再必要了
// IIFE 写法
(function() {
  var tmp = 123;
})();
// versus
{
  let tmp = 123;
}

// 4:  块级作用域与函数声明
// 4.1   ES5规定，函数只能在顶层作用域和函数作用域之中声明。不能在块级作用域 声明-----猜测：会造成全局污染
// case one:
if (true) {
  function f() {}
}

// case two:
try {
  function f() {}
} catch (error) {}
// 4.1   但浏览器并未规定，为兼容以前的旧代码，还是支持在跨级作用域之中声明函数

// 4.2  ES6规定，允许在块级作用域之中声明函数。ES6规定，块级作用域之中，
//      函数声明语句的行为类似于let，在块级作用域之外不可引用。
function f(){console.log("I'm outside!")}
(function(){
  if(false) {
    function f(){console.log("I'm inside!")};
  }
  f();      // TypeError: f is not a function.
}())
// 因为function f(){} 函数声明存在变量提升，到当前顶层作用域中，
// 实际运行如下:
(function(){
  var f = undefined;
  if(false){
    function f(){console.log("I'm inside")};
  }
  f();      // f为undefined，无法调用
}())

// 5：  块级作用域内部，优先使用函数表达式
{
  let a = "secret";
  let f = function() { return a;}
}

// 6:   ES6 块级作用域必须有大括号，如果没有大括号，js引擎认为不存在块级作用域
if(true) let x =1;      // SyntaxError: Lexical declaration cannot appear in a single-statement context.

if(true) { let x = 1};  // 不报错

// 第一种写法没有包括大括号，所以不存在块级作用域，而let只能出现在当前作用域的顶层
// 函数声明也是如此
"use strict"
if(true) {function f(){}}

if(true) function f(){}
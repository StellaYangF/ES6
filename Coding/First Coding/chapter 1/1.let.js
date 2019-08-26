/* 一：let申明的变量，只在命令所在的代码块内有效  */
{
  let a = 10;
  var b = 1;
}
/** a: uncaught reference error: a is not defined;
 **
 ** b: 1
 */

let total = 0;
for (let i = 0; i < 10; i++) {
  total += i;
}
console.log(i); //ReferenceError: i is not defined

for (var j = 0; j < 10; j++) {
  total += j;
}
console.log(j); // j:10
/* for循环的计数器，很适合let命令
 **
 */

/* 二： 不存在变量提升 */

/* 三： 暂时性死区  Temporal Dead Zone */
// 3.1 只要块级作用域内存在let命令，所声明的变量就binding在这个区域，不受外部的影响
var tmp = 123;
if (true) {
  tmp = "abc"; // 先调用
  let tmp; // 再声明
}
// Uncaught ReferenceError: cannot access tmp before initialization

// 3.2 typeof 不再是一个百分之百安全的操作
typeof x; // ReferenceError: cannot access "x" before initialization
let x;
// versus
typeof undeclared_variable; // undefined
// tips----variables must be used after declaration
function bar(x = y, y = 2) {
  return [x, y];
  //x=y，此时的y并没有声明
}
bar();    // ReferenceError: cannot access "y" before initialization
// versus
function bar(y=2, x=y){
  return [x, y]   
}
bar();    // [2, 2]

var x = x;    // undefine
let y = y;    // ReferenceError:cnanot access "y" before initialization

// 3.3 暂时性死区本质： 只要一进入当前作用域，所有使用的变量都已存在，但不可获取，只有等到
// 声明变量的那一行代码出现，才可以获取和使用该变量。


/* 四： 不允许重复声明 */ 
// 不允许在相同作用域内，重复声明同一个变量
function func(arg){
  let arg;          
}
func();// SyntaxError: Indetifier "arg" has already been declared.
function func(arg){
  {
    let arg;
  }
}
func();   // No error
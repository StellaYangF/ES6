// 本章探讨如何将 ES6 的新语法，运用到编码实践之中，
// 与传统的 JavaScript 语法结合在一起，写出合理的、易于阅读和维护的代码。


// 多家公司和组织已经公开了它们的风格规范，下面的内容主要参考了 Airbnb 公司的 JavaScript 风格规范。

// 块级作用域
// （1）let 取代 var

// ES6 提出了两个新的声明变量的命令：let和const。其中，let完全可以取代var，因为两者语义相同，而且let没有副作用。

'use strict';

if(true){
  let x = 'hello';
}
for(let i = 0; i<10; i++){
  console.log(i);
}

// versus
for(var i = 0; i< 10; i++){
  console.log(i);
}
// 此时的i为全局变量；内存循环结束之时i已++为10；

// 上面代码如果用var替代let，实际上就声明了两个全局变量，这显然不是本意。变量应该只在其声明的代码块内有效，var命令做不到这一点。
// var命令存在变量提升效用，let命令没有这个问题。
'use strict';
if(true) {
  console.log(x);  // Uncaguht ReferenceError: Cannot access 'x' before initialization
  let x = 'hello';
}

// versus
if(true) {
  console.log(x);  // undefined
  var x = 'hello';
}

// 上面代码如果使用var替代let，console.log那一行就不会报错，而是会输出undefined，
// 因为变量声明提升到代码块的头部。这违反了变量先声明后使用的原则。

// 所以，建议不再使用var命令，而是使用let命令取代。

// （2）全局常量和线程安全

// const优于let有几个原因。
// 一个是const可以提醒阅读程序的人，这个变量不应该改变；
// 另一个是const比较符合函数式编程思想，运算不改变值，只是新建值，而且这样也有利于将来的分布式运算；
// 最后一个原因是 JavaScript 编译器会对const进行优化，所以多使用const，
// 有利于提高程序的运行效率，也就是说let和const的本质区别，其实是编译器内部的处理不同。
// bad
var a=1, b= 2, c =3;
// Good
const a =1;
const b =2;
const c =3;
// Best
const [a, b, c] = [1, 2, 3];
// const声明常量还有两个好处，一是阅读代码的人立刻会意识到不应该修改这个值，二是防止了无意间修改变量值所导致的错误。



// (1) Generator 与状态机
// Generator 是实现状态机的最佳结构。比如，下面的clock函数就是一个状态机。

let ticking = true;
let clock = function(){
  if(ticking) console.log("Tick!");
  else console.log("Tock!");
  ticking = !ticking;
}

// 上面代码的clock函数一共有两种状态（Tick和Tock），每运行一次，就改变一次状态。
// 这个函数如果用 Generator 实现，就是下面这样。
let clock = function* (){
  while(true){
    console.log('Tick!');
    yield;
    console.log("Tock");
    yield;
  }
}

// 上面的 Generator 实现与 ES5 实现对比，可以看到少了用来保存状态的外部变量ticking，
// 这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。
// Generator 之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。


// (2) Generator 与协程
// 协程（coroutine）是一种程序运行的方式，可以理解成“协作的线程”或“协作的函数”。
// 协程既可以用单线程实现，也可以用多线程实现。前者是一种特殊的子例程，后者是一种特殊的线程。

// (3) Generator 与上下文

// JavaScript 代码运行时，会产生一个全局的上下文环境（context，又称运行环境），
// 包含了当前所有的变量和对象。然后，执行函数（或块级代码）的时候，又会在当前上下文环境的上层，产生一个函数运行的上下文，
// 变成当前（active）的上下文，由此形成一个上下文环境的堆栈（context stack）。

// 这个堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，退出堆栈，
// 然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。

// Generator 函数不是这样，它执行产生的上下文环境，一旦遇到yield命令，
// 就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。
// 等到对它执行next命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。
function* gen (){
  yield 1;
  return 2;
}
let g = gen();
console.log(
  g.next().value,
  g.next().value,
)
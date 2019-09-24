// （1） Generator 与状态机

// Generator 是实现状态机的最佳结构。比如，下面的clock函数就是一个状态机。

// 对比
// ES5 实现方式
let ticking = true;
let clock = function () {
  ticking ? console.log("Tick!") : console.log("Tock!");
  ticking = !ticking;
}
while(true) {
  clock();
}

// ES6
function* clock() {
  while(true) {
    console.log("Tick!");
    yield;
    console.log("Tock!");
    yield;
  }
}
let c =  clock();
c.next();
c.next();
c.next();
// Tick!  {value: undefined, done: false}
// Tock!  {value: undefined, done: false}
// Tick!  {value: undefined, done: false}


// （2） Generator 与 协程 coroutine


// 协程

// 传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。
// 其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

// 协程有点像函数，又有点像线程。它的运行流程大致如下。

/* 
  第一步，协程A开始执行。
  第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
  第三步，（一段时间后）协程B交还执行权。
  第四步，协程A恢复执行。
*/ 

// 上面流程的协程A，就是异步任务，因为它分成两段（或多段）执行。

// 举例来说，读取文件的协程写法如下。
function* asyncJob(){
  // other codes...
  let f = yield readFile(fileA);
  // other codes...
}

// 上面代码的函数asyncJob是一个协程，它的奥妙就在其中的yield命令。
// 它表示执行到此处，执行权将交给其他协程。也就是说，yield命令是异步两个阶段的分界线。

// 协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。
// 它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。

// 协程的 Generator 函数实现

// Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。

// 整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。
// 异步操作需要暂停的地方，都用yield语句注明。Generator 函数的执行方法如下。
function* gen(x) {
  let y = yield x+2;
  return y;
}

let g = gen();
g.next();
g.next();

// 换言之，next方法的作用是分阶段执行Generator函数。
// 每次调用next方法，会返回一个对象，表示当前阶段的信息（value属性和done属性）。
// value属性是yield语句后面表达式的值，表示当前阶段的值；
// done属性是一个布尔值，表示 Generator 函数是否执行完毕，即是否还有下一个阶段。

// Generator 函数的数据交换和错误处理

// Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。
// 除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。

// next返回值的 value 属性，是 Generator 函数向外输出数据；next方法还可以接受参数，向 Generator 函数体内输入数据。

function* gen(x){
  let y = yield x+2;
  return y;
}
let g = gen(1);
g.next();       // {value: 3, done: false}
g.next(2);      // {value: 2, done: true}

// 上面代码中，第一个next方法的value属性，返回表达式x + 2的值3。
// 第二个next方法带有参数2，这个参数可以传入 Generator 函数，作为上个阶段异步任务的返回结果，被函数体内的变量y接收。
// 因此，这一步的value属性，返回的就是2（变量y的值）。

// Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。

function* gen(x){
  try{
    let y = yield x+2;
  }catch(error){
    console.log(error);
  }
  return y;
}

let g = gen(1);
g.next();
g.throw('Error');
// "Error"

// 异步任务的封装
// 下面看看如何使用 Generator 函数，执行一个真实的异步任务。
let fetch = require('node-fetch');

function* gen(){
  let url = "https://api.github.com/users/github";
  let result = yield fetch(url);
  console.log(result.bio);
}

let g = gen();
let result = g.next();
result.value.then(function (data) {
  return data.json(); 
}).then(function(data) {
  g.next(data);
}) 
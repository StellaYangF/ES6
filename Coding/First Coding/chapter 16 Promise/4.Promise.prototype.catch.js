// Promise.prototype.catch方法是.then(null, rejection)或.then(undefined, rejection)的别名，
// 用于指定发生错误时的回调函数。
const getval = function(val){
  return new Promise((resolve, reject) => {
    if(val > 10) resolve(val);
    else reject(new Error("Small number" + val));
  })
}

getval(14).then(
  val => {
    if( val === 14){
      console.log(val + t);
    }
  }
).catch(
  err => console.log(err)
)
// 上面代码中，getJSON方法返回一个 Promise 对象，如果该对象状态变为resolved，
// 则会调用then方法指定的回调函数；如果异步操作抛出错误，
// 状态就会变为rejected，就会调用catch方法指定的回调函数，处理这个错误。
// 另外，then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获。

// reject方法的作用，等同于抛出错误。

// 如果 Promise 状态已经变成resolved，再抛出错误是无效的。

const promise = new Promise((resolve, reject) => {
  resolve('OK');
  throw new Error('test');
  // 等同于
  // reject(new Error('test'));
}).then(val => console.log(val))
.catch(err => console.log(err));


// 上面代码中，Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了。

// Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

// 一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。

promise
  .then( data => {})
  .catch( err => {})

// 跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，
// Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。

promise = function(){
  return new Promise((resolve, reject) => {
    console.log(x + 2);
  })
}
promise().then(()=> console.log('Everything is great.'))
setTimeout(() => {
  console.log(123);
}, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123

// 上面代码中，someAsyncThing函数产生的 Promise 对象，内部有语法错误。
// 浏览器运行到这一行，会打印出错误提示ReferenceError: x is not defined，
// 但是不会退出进程、终止脚本执行，2 秒之后还是会输出123。
// 这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。


// 注意，Node 有计划在未来废除unhandledRejection事件。如果 Promise 内部有未捕获的错误，会直接终止进程，并且进程的退出码不为 0。
promise = new Promise((resolve, reject) => {
  resolve('OK');
  setTimeout(()=>{throw new Error('test')},0)
})
.then(val => console.log(val));
// ok
// Uncaught Error: test

// 上面代码中，Promise 指定在下一轮“事件循环”再抛出错误。
// 到了那个时候，Promise 的运行已经结束了，所以这个错误是在 Promise 函数体外抛出的，
// 会冒泡到最外层，成了未捕获的错误。



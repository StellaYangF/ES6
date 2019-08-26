// 有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。
const jsPromise = Promise.resolve($.ajax('/whatever.json'));

// Promise.resolve等价于下面的写法。
Promise.resolve('foo');
new Promise(resolve => resolve('foo'));

// Promise.resolve方法的参数分成四种情况。

// （1）参数是一个 Promise 实例
// 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

// （2）参数是一个thenable对象
// thenable对象指的是具有then方法的对象，比如下面这个对象。
let thenable = {
  then(resolve, reject){
    resolve(42)
  }
}
// Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。



// （3）参数不是具有then方法的对象，或根本就不是对象
// 如果参数是一个原始值，或者是一个不具有then方法的对象，
// 则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
const p = Promise.resolve('Hello');
p.then(s => console.log(s));



// （4）不带有任何参数
// Promise.resolve()方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
// 所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve()方法。
const p = Promise.resolve();
p.then(()=>"tom").then(val=>console.log(val));


// 需要注意的是，立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，
// 而不是在下一轮“事件循环”的开始时。
setTimeout(() => {
  console.log(333);
}, 0);
Promise.resolve().then(()=> console.log(222));
console.log(111);
// 111
// 222
// 333
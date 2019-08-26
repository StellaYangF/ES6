// ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。

// example 1:
const promise = new Promise((resolve, reject)=>{
  if(/* 异步操作成功 */){
    // success 
    resolve(value);
  }else{
    // failure
    reject(value);
  }
  })

  // Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
  // 它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

// resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），
// 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
// reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），
// 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
promise.then(
  success =>{},
  error =>{}
)

// then方法可以接受两个回调函数作为参数。
// 第一个回调函数是Promise对象的状态变为resolved时调用，
// 第二个回调函数是Promise对象的状态变为rejected时调用。
// 其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

// example: 2
function timeout (ms){
  return new Promise((resolve, reject) =>{
    // setTimeout(()=>{resolve("done")}, ms)
    setTimeout(resolve, ms, 'done');
  })
}

timeout(100).then(value=>{
  console.log(value);
})

// Promise 新建后就会立即执行。
// example 3:
let promise = new Promise((resolve, reject)=>{
  console.log("Promise");
  resolve();
});
promise.then(()=> { console.log('resolved.')});

console.log("Hi");
// Promise
// Hi!
// resolved

// 上面代码中，Promise 新建后立即执行，所以首先输出的是Promise。
// 然后，then方法指定的回调函数，将在【当前脚本所有同步任务执行完才会执行】，所以resolved最后输出。

// example 4:
function loadImageAsync(url) { 
  return new Promise((resolve, reject)=>{
    const img = new Image();

    img.onload = function(){
      resolve(image);
    };

    img.onerror = function() {
      reject(new Error('Cound not load img at '+ url));
    };

    img.src = url;
  })
}
// 上面代码中，使用Promise包装了一个图片加载的异步操作。
// 如果加载成功，就调用resolve方法，否则就调用reject方法。

// example 5: 
// 下面是一个用Promise对象实现的 Ajax 操作的例子。
const getJSON = function(url){
  const promise = new Promise((resolve, reject)=>{
    const handler = function (){
      if(this.readyState !== 4){
        return;
      }
      if (this.status === 200){
        resolve(this.response);
      }else{
        reject(new Error(this.statusText));
      }
    }
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader("Accept", 'application/json');
    client.send();
  })
  return promise;
}

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});

// 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。
// reject函数的参数通常是Error对象的实例，表示抛出的错误；
// resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。
const p1 = new Promise((resolve, reject)=>{
  //...
});
const p2 = new Promise((resolve, reject) =>{
  resolve(p1);
})
// 注意，这时p1的状态就会传递给p2，也就是说，p1的状态决定了p2的状态。
// 如果p1的状态是pending，那么p2的回调函数就会等待p1的状态改变；
// 如果p1的状态已经是resolved或者rejected，那么p2的回调函数将会立刻执行。

const p1 = new Promise((resolve, reject) => {
  setTimeout(()=>{
    reject(new Error("fail"))
  }, 3000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(p1);
  }, 1000);
})
p2.then(res => console.log(res))
.catch(error => console.log(error));

// Error: Fail

// 注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。
new Promise(resolve => {
  resolve(1);
  console.log(2);
}).then(val => console.log(val));
// 2 1

// 一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，
// 而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。
new Promise(resolve => {
  return resolve(1);
  console.log(2);
})

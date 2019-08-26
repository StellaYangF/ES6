
// Promise 实例具有then方法，也就是说，then方法是定义在原型对象Promise.prototype上的。
// 它的作用是为 Promise 实例添加状态改变时的回调函数。
// 前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。

// then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。
// 因此可以采用链式写法，即then方法后面再调用另一个then方法。

const promise = function(val){
  return new Promise(resolve => {
    console.log("begin");
    resolve(val);
  })
}
promise(333).then(
  val => promise(val+"second")
).then(
  val => console.log('resolved: ' + val),
  err => console.log("rejected: " + err)
)
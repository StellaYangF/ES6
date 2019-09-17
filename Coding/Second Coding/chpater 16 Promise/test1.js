const Promise = require('./promise.1');

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(new Promise(resolve => resolve('hello')));
  });
})

// 1)普通值
p.then(data => console.log(data), reason => console.log(reason));


// 2）返回promise本身时
// let promise2 = p.then(data => promise2).then(null, reason => console.log(reason));    
// 箭头函数返回时promise2 !== x
let promise2 = p.then(data => {
    return promise2; // 必须是return 返回
})
// promise2.then(
//     data => console.log(data), error => console.log('oops!', error)
// );

// 5）返回promise实例时
p.then(data => new Promise(resolve => resolve(222)))
  .then(data => console.log(data));

// 链式操作
// 4) 返回普通值
p
  .then(
    data => 1 ,
    reason => console.log(reason)
  )
  .then(
    data => console.log(data), 
    reason => console.log(reason)
  );
// Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。

const p = Promise.reject("error!");
// equals to
const p = new Promise((resolve, reject) => {
  reject("error!");
});

p.then(result => console.log(result)).catch(e => console.log(e));

// 注意，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。
// 这一点与Promise.resolve方法不一致。
const thenable = {
  then(resolve, reject){
    reject('Error!');
  }
}
Promise.reject(thenable)
  .catch(e => {
    console.log(e === thenable)
  })

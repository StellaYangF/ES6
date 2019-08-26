// async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
// 当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

// example 1:
async function getStockPriceByName (name){
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPriceByName(symbol);
  return stockPrice;
}
getStockPriceByName("goog").then(result=>{
  console.log(result);
})

// example 2:
function timeout (ms) {
  return new Promise(resolve => {
    setTimeout(resolve,ms);
  });
}

async function asyncPrint(value, ms){
  await timeout(ms);
  console.log(value);
}
asyncPrint("hello world", 50);

// 由于async函数返回的是 Promise 对象，可以作为await命令的参数。所以，上面的例子也可以写成下面的形式。
async function timeout(ms) {
  await new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

async function asyncPrint(value, ms){
  await timeout(ms);
  console.log(value);
}

asyncPrint("hello world", 5000);

// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(//...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(//…);

// 箭头函数
const foo = async () => {};
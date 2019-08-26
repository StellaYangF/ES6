// async函数内部return语句返回的值，会成为then方法回调函数的参数。
async function f() {
  return "hello world";
}
f().then(v => console.log(v));

async function f() {
  throw new Error("出错了！");
}
f()
  .then(() => console.log(5))
  .catch(e => console.log(e));

// 正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
async function f() {
  return await 123;
  // equals to
  return 123;
}
f().then(v => console.log(v));

// 另一种情况是，await命令后面是一个thenable对象（即定义then方法的对象），那么await会将其等同于 Promise 对象。
class Sleep {
  constructor(timeout) {
    this.timeout = timeout;
  }
  then(resolve, reject) {
    const startTime = Date.now();
    setTimeout(() => {
      resolve(Date.now() - startTime);
    }, this.timeout);
  }
}

(async () => {
  const sleepTime = await new Sleep(1000);
  console.log(sleepTime);
})();

// simplified version
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  });
}

async function one2FiveInAsync(interval) {
  for (let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(interval);
  }
}
one2FiveInAsync(1000);

// await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。

async function f() {
  await Promise.reject("出错了！");
}
f()
  .then(v => console.log(v))
  .catch(e => console.log(e));

// 出错了！

// 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
async function f() {
  await Promise.reject("出错了~");
  await Promise.resolve("hello world"); //不会执行
}

// 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。
// 这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
async function f() {
  try {
    await Promise.reject("sth wrong happens");
  } catch (e) {}
  return await Promise.resolve("Hello world");
}
f().then(v => console.log(v));

// 另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
async function f() {
  await Promise.reject("sth wrong happens").catch(e => console.log(e));
  return await Promise.resolve("Hello world");
}
f().then(v => console.log(v));

// 如果有多个await命令，可以统一放在try...catch结构中。
async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log("Final: ", val3);
  } catch (err) {
    console.log(err);
  }
}

function firstStep() {
  return Promise.resolve(1);
}
function secondStep(val1) {
  return Promise.resolve(val1 + 2);
}
function thirdStep(val1, val2) {
  return Promise.resolve(val1 + val2);
}

// 下面的例子使用try...catch结构，实现多次重复尝试。

const num_retires = 3;

async function test() {
  let i;
  for (i = 0; i < num_retires; i++) {
    try {
      await fetch("http://baidu.com").catch(e => console.log(e));
      break;
    } catch (err) {
      console.log(err);
    }
  }
  console.log(i);
}
test();
// 上面代码中，如果await操作成功，就会使用break语句退出循环；如果失败，会被catch语句捕捉，然后进入下一轮循环。

// 使用注意点
// 第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，
// 所以最好把await命令放在try...catch代码块中。
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}
// another one
async function myFunction() {
  await somethingThatReturnsAPromise().catch(err => console.log(err));
}

// 第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
let foo = await getFoo();
let bar = await getbar();

// 上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。
// 这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。
let [foo, bar] = await Promise.all([getFoo(), getbar()]);

// another one
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
// 上面两种写法，getFoo和getBar都是同时触发，这样就会缩短程序的执行时间。

// 第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  docs.forEach(doc =>{
    await db.post(doc);
  })
}

//上面代码会报错，因为await用在普通函数之中了。但是，如果将forEach方法的参数改成async函数，也有问题。

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  docs.forEach(async doc =>{
    await db.post(doc);
  })
}

// 上面代码可能不会正常工作，原因是这时三个db.post操作将是并发执行，也就是同时执行，而不是继发执行。
// 正确的写法是采用for循环。
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for(let doc of docs){
    await db.post(doc);
  }
}

// 如果确实希望多个请求并发执行，可以使用Promise.all方法。当三个请求都会resolved时，下面两种写法效果相同。
// one
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map(doc => db.post(doc));
  let results= await Promise.all(promises);
  console.log(results);
}

// OR two using for...of
async function dbFuc(db) {
  let docs = [{}, {}, {}];;
  let promises = docs.map(doc => db.post(db));
  let results = [];
  for(let promise of promises) {
    results.push(promise);
  }
  console.log(results);
}


// 第四点，async 函数可以保留运行堆栈。
const a = () => {
  bar().then(() => c());
}
// 上面代码中，函数a内部运行了一个异步任务b()。当b()运行的时候，函数a()不会中断，而是继续执行。
// 等到b()运行结束，可能a()早就运行结束了，b()所在的上下文环境已经消失了。
// 如果b()或c()报错，错误堆栈将不包括a()。

// 现在将这个例子改成async函数。
const a = async () => {
  await bar();
  c();
}

// 上面代码中，b()运行的时候，a()是暂停执行，上下文环境都保存着。一旦b()或c()报错，错误堆栈将包括a()。


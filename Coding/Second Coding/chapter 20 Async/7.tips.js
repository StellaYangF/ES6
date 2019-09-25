// 第一点，前面已经说过，await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。

// 第二点，多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
let foo = await getFoo();
let bar = await getBar();

// updated 1
let [ foo, bar ] = await Promise.all([getFoo(), getBar()]);

// updated2
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise();
let bar = await barPromise();
// 同时触发就会缩短时间

// 第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。

// 第四点，async 函数可以保留运行堆栈。
const a = () => {
  b().then(() => c());
}

// updated
const a = async () => {
  await b();
  c();
}
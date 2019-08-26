// 就像 Generator 函数返回一个同步遍历器对象一样，异步 Generator 函数的作用，是返回一个异步遍历器对象。

// 在语法上，异步 Generator 函数就是async函数与 Generator 函数的结合。

async function* gen() {
  yield 'hello';
}
const genObj = gen();

genObj.next().then(x => console.log(x));
// { value : 'hello', done: false }

// 上面代码中，gen是一个异步 Generator 函数，执行后返回一个异步 Iterator 对象。
// 对该对象调用next方法，返回一个 Promise 对象。

// 异步遍历器的设计目的之一，就是 Generator 函数处理同步操作和异步操作时，能够使用同一套接口。

// sync Generator function
function* map(iteratable, func) {
  const iter = iteratable[Symbol.iterator]();

  while(true){
    const { value, done} = iter.next();
    if(done) break;
    yield func(value);
  }
}

// async Generator function
async function* map(iteratable, func) {
  const iter = iteratable[Symbol.asyncItera]();
  while(true) {
    const { value, done} = await iter.next();
    if (done) break; 
    yield func(value);
  }
}

// 上面代码中，map是一个 Generator 函数，
// 第一个参数是可遍历对象iterable，第二个参数是一个回调函数func。
// map的作用是将iterable每一步返回的值，使用func进行处理。
// 上面有两个版本的map，前一个处理同步遍历器，后一个处理异步遍历器，
// 可以看到两个版本的写法基本上是一致的。


arr = ['a', 'b', 'c'];
function func(val){
  console.log(val);
}

// 下面是另一个异步 Generator 函数的例子。

async function* readLines(path) {
  let file = await fileOpen(path);

  try{
    while(!file.EOF) {
      yield await file.readLine();
    }
  }finally{
    await file.close();
  }
}
// 上面代码中，异步操作前面使用await关键字标明，即await后面的操作，应该返回 Promise 对象。
// 凡是使用yield关键字的地方，就是next方法停下来的地方，
// 它后面的表达式的值（即await file.readLine()的值），会作为next()返回对象的value属性，
// 这一点是与同步 Generator 函数一致的。

// 异步 Generator 函数内部，能够同时使用await和yield命令。
// 可以这样理解，await命令用于将外部操作产生的值输入函数内部，yield命令用于将函数内部的值输出。

// 上面代码定义的异步 Generator 函数的用法如下。

(async function() {
  for await(const line of readLines(filePath)) {
    console.log(line);
  }
})()
// 异步 Generator 函数可以与for await...of循环结合起来使用。

async function* prefixLines(asyncIterable) {
  for await (const line of asyncIterable) {
    yield '> ' + 'line';
  }
}

// 异步 Generator 函数的返回值是一个异步 Iterator，即每次调用它的next方法，
// 会返回一个 Promise 对象，也就是说，跟在yield命令后面的，应该是一个 Promise 对象。
// 如果像上面那个例子那样，yield命令后面是一个字符串，会被自动包装成一个 Promise 对象。


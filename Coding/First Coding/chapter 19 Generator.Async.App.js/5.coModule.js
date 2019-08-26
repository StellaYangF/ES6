// co 模块是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行。

// 下面是一个 Generator 函数，用于依次读取两个文件。

let gen = function*() {
  let f1 = yield readFile("/etc/fstab");
  let f2 = yield readFile("/etc/shells");
  console.log(f1.toString());
  console.log(f2.toString());
};

// co 模块可以让你不用编写 Generator 函数的执行器。
let co = require("co");
co(gen);

// co函数返回一个Promise对象，因此可以用then方法添加回调函数。
co(gen).then(function() {
  console.log("Genenrator 函数执行完成");
});

// 基于 Promise 对象的自动执行
let fs = require("fs");

let readFile = function(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, function(err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

let gen = function*() {
  let f1 = yield readFile("...");
  let f2 = yield readFile("...");
  console.log(f1.toString());
  console.log(f2.toString());
};

// 手动执行上面的Generator函数
let g = gen();
g.next().value.then(data => {
  g.next(data).value.then(data => {
    g.next(data);
  });
});

// 手动执行其实就是用then方法，层层添加回调函数。理解了这一点，就可以写出一个自动执行器。

function run(gen){
  let g = gen();

  function next(data){
    let result = g.next(data);
    if(result.done) return result.value;
    result.value.then(data=>{
      next(data);
    })
  }
  next();
}

run(gen);

//co 模块的源码
// co 就是上面那个自动执行器的扩展，它的源码只有几十行，非常简单。
// 首先，co 函数接受 Generator 函数作为参数，返回一个 Promise 对象。
function co(gen){
  let ctx = this;
  return new Promise(function(resolve, reject){
    if(typeof g === 'function') gen = gen.call(ctx);
    if(!gen || typeof gen.next()!== 'function') return resolve(gen);
    // 接着，co 将 Generator 函数的内部指针对象的next方法，包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误。

    onFulfilled();
    function onFulfilled(res){
      let ret;
      try{
        ret = gen.next(res);
      }catch (e) {
        return reject(e);
      }
      next(ret);
      // 最后，就是关键的next函数，它会反复调用自身。

      function next(ret){
        if(ret.done) return resolve(ret.value);
        let value  =  toPrimise.call(ctx, ret.value);
        if(value && isPromise(value)) return value.then(onFulfilled, onRejected);
        return onRejected (
          new TypeError(
            'You may only yield a function, promise, generator, array, or object, '
            +'but the following object was passed: "'
            + String(ret.value)
            + '"'
          )
        )
      }
    }
  });
}






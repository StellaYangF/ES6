// async 函数的实现原理
// async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
async function fn(args) {
  // ...
}
// equals
function fn(args) {
  return spawn(function*() {
    // ...
  });
}

// 所有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器。

// 下面给出spawn函数的实现，基本就是前文自动执行器的翻版。

function spawn(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(
        v => {
          step(() => gen.next(v));
        },
        e => {
          step(() => gen.throw(e));
        }
      );
    }
    step(() => gen.next(undefined));
  });
}

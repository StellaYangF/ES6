// async实现原理： 就是将generator函数 和 自动执行器。包装在一个函数里
async function fn(args) {
  await someHanlder();
}
// equals to
function fn(args) {
  return spwan(function* () {
    yield someHanlder();
  })
}

// 下面给出spawn函数的实现，基本就是前文自动执行器的翻版。

function spwan(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF();  
    // 返回Iterator迭代器 { value: , done: }
    // 可用三种方法调用： .next(), .throw(), .return
    
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(err) {
        return reject(e);
      }

      if (next.done) {
        return resolve(next.value);
      }

      Promise.resolve(next.value).then(
        v => step(() => gen.next(v)),
        err => gen.throw(err)
      )
    }

    step(() => gen.next(undefined));
  })
}


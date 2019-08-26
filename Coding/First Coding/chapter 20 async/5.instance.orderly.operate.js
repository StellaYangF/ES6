// 与其他异步处理方法的比较
// 我们通过一个例子，来看 async 函数与 Promise、Generator 函数的比较。

// 假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。
// 如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。

// 首先是 Promise 的写法。
function chainAniamationsPromise(elem, animations) {
  let ret = null;

  let p = Promise.resolve();

  for(let anim of animations) {
    p = p.then(val => {
      ret = val;
      return anim(elem);
    });
  }
  return p.catch(e=>{})
    .then(() => ret);
}

// 虽然 Promise 的写法比回调函数的写法大大改进，但是一眼看上去，代码完全都是 Promise 的 API（then、catch等等），
// 操作本身的语义反而不容易看出来。

// 接着是 Generator 函数的写法。

function chainAniamationsPromise(elem, animations) {
  return spawn(function*() {
    let ret = null;
    try{
      for (let anim of animations) {
        ret = yield anim(elem);
      }
    }catch (e) {}
    return ret;
  })
}

// 上面代码使用 Generator 函数遍历了每个动画，语义比 Promise 写法更清晰，用户定义的操作全部都出现在spawn函数的内部。
// 这个写法的问题在于，必须有一个任务运行器，自动执行 Generator 函数，上面代码的spawn函数就是自动执行器，
// 它返回一个 Promise 对象，而且必须保证yield语句后面的表达式，必须返回一个 Promise。

// 最后是 async 函数的写法。
async function chainAniamationsPromise(elem, animations){
  let ret = null;
  try{
    for(let anim of animations) {
      ret = await anim(elem);
    }
  } catch(err) {}
  return ret;
}

// 可以看到 Async 函数的实现最简洁，最符合语义，几乎没有语义不相关的代码。
// 它将 Generator 写法中的自动执行器，改在语言层面提供，不暴露给用户，因此代码量最少。
// 如果使用 Generator 写法，自动执行器需要用户自己提供。



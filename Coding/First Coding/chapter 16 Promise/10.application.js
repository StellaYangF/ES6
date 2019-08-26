// load image
// 我们可以将图片的加载写成一个Promise，一旦加载完成，Promise的状态就发生变化。
const preloafIamge = function(path){
  return new Prosmise((resolve, reject) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = path;
  })
}


// Generator 函数与 Promise 的结合
// 使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。
function getFoo () {
  return new Promise((resolve, reject) => {
    resolve('foo');
  })
}

const g = function*() {
  try{
    const foo = yield getFoo();
    console.log(foo);
  }catch (e) {
    console.log(e);
  }
}

function run (generator){
  const it = generator();

  function go (result){
    if(result.done) return result.value;

    return result.value.then(value => go(it.next(value)),
      e => go(it.throw(e))
    );
  }

  go(it.next());
}
run(g);
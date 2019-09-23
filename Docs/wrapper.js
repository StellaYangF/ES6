// Generator 函数如果不用wrapper先包一层，是无法第一次调用next方法，就输入参数的。

function wrapper(generatorFunction) {
  // 传入generator函数，返回一个函数接收参数
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    // 直接调用一次  输入参数给yield返回值用
    generatorObject.next();
    // 返回生成器函数
    return generatorObject;
  }
}

const warpped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return "DONE";
})
warpped().next("hello");


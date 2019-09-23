function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    // 直接调用一次  输入参数给yield返回值用
    generatorObject.next();
    return generatorObject;
  }
}

const warpped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return "DONE";
})
warpped().next("hello");
const iterator = {};
iterator[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
  return 'end';
};

console.log([...iterator]);
// [ 1, 2, 3 ]


// Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。
const gen = function* () {}
const g = gen();
g[Symbol.iterator]() === g;  // true
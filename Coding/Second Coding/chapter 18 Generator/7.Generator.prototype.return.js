// Generator函数返回的Iterator对象，还有return方法，返回给定的值，并终结遍历的Generator函数
function* gen () {
  yield 1;
  yield 2;
  yield 3;
}
let it = gen();
it.next();
it.return('End');
it.next();
//  { value: 1, done: false }
//  { value: "End", done: true }
//  { value: undefined, done: true }

// return不提供参数
function* gen () {
  yield 1;
  yield 2;
  yield 3;
}
let it = gen();
it.next();
it.return();
// { value: 1, done: false }
// { value: undefined, done: true }


// `Generator`函数内部有try...finally代码块，且正在执行try代码块，则`return`会立即进入`finally`代码块，执行完以后，整个函数才会结束
function* numbers() {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
let it = numbers();
it.next();
it.next();
it.return(7);
it.next();
it.next();
it.next();
// { value: 1, done: false };
// { value: 2, done: false };
// { value: 4, done: false };
// { value: 5, done: false };
// { value: 7, done: true };
// { value: undefined, done: true };


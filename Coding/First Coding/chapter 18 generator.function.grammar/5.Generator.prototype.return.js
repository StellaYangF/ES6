// Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且【终结遍历 Generator 函数】。
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

let g = gen();
g.next();
g.return('foo');
g.next();

// 上面代码中，遍历器对象g调用return方法后，
// 返回值的value属性就是return方法的参数foo。
// 并且，Generator 函数的遍历就终止了，返回值的done属性为true，
// 以后再调用next方法，done属性总是返回true。

// 如果return方法调用时，不提供参数，则返回值的value属性为undefined。

function* gen() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}
let g = gen();
g.next();   // {value: 1, done : false}
g.return(); // {value: undefined, done:true}

// 如果 Generator 函数内部有try...finally代码块，且【正在执行try代码块】，那么return方法会推迟到finally代码块执行完再执行。
function* gen () {
  yield 1;
  try{
    yield 2;
    yield 3;
  }finally {
    yield 4;
    yield 5;
  }
  yield 6;
}

let g = gen();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
// 上面代码中，调用return方法后，就开始执行finally代码块，然后等到finally代码块执行完，再执行return方法。


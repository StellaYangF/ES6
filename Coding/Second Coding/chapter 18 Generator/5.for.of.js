function* foo () {
  yield 'Hello';
  yield '你好';
  yield 'Bonjour';
  yield 'Hola';
  return `Let's start!`;
}

for (let w of foo()) {
  console.log(w);
}
// Hello
// 你好
// Bonjour
// Hola

// 为对象添加遍历结构
// 1) 方法一：
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);
  for (let key of propKeys) {
    yield [key, obj[key]];
  }

  // propKyes.forEach(key => {
  //   yield [key, obj[key]];
  // })
}
for (let pair of objectEntries({name:"tom", age: 18})) {
  console.log(pair);
}
// [ 'name', 'tom' ]
// [ 'age', 18 ]

// 2）方法二：
function* objectEntries() {
  let propKeys = Reflect.ownKeys(this);
  for (let key of propKeys) {
    yield [key, this[key]];
  }
}
let tom = { name: "Tom", age: 18 };
tom[Symbol.iterator] = objectEntries;
for (let pair of tom) {
  console.log(pair);
}
// [ 'name', 'Tom' ]
// [ 'age', 18 ]
// [ Symbol(Symbol.iterator), [GeneratorFunction: objectEntries] ]

/*实现菲波那切数列*/ 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield prev;
    [prev, curr] = [curr, prev + curr];
  }
}
for (let n of fibonacci()) {
  if (n > 10) break;
  console.log(n);
}
// 0
// 1
// 1
// 2
// 3
// 5
// 8


// 调用Iterator接口的运算有： for...of, ..., destructing, Array.from
function* numbers () {
  yield 1;
  yield 2;
  return 3;
  yield 4;
}
[...numbers()];
// [ 1, 2 ];
let [ a, b ] = [...numbers()];
// a = 1; b = 2;
Array.from(numbers());
// [ 1, 2 ];

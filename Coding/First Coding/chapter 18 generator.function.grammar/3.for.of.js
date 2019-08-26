//  for of
// for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 上面代码使用for...of循环，依次显示 5 个yield表达式的值。
// 这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且【不包含该返回对象】，
// 所以上面代码的return语句返回的6，不包括在for...of循环之中。

// 下面是一个利用 Generator 函数和for...of循环，实现斐波那契数列的例子。
function* Fibonacci() {
  let [prev, cur] = [0, 1];
  for (;;) {
    yield cur;
    [prev, cur] = [cur, prev + cur];
  }
}
let a =[];
for(let n of Fibonacci()){
  if (n > 1000) break;
  a.push(n);
}

function fibonacci(n, ac1 = 1, ac2 = 1) {
  if(n <=2 ) return ac2;
  return fibonacci(n-1, ac2, ac1+ ac2);
}

// 利用for...of循环，可以写出遍历任意对象（object）的方法。
// 原生的 JavaScript 对象没有遍历接口，无法使用for...of循环，通过 Generator 函数为它加上这个接口，就可以用了。
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for(let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}
let jane = {first: 'jane', last: 'Doe'};
for(let [key, value] of objectEntries(jane)){
  console.log(`${key}: ${value}`);
}

// 上面代码中，对象jane原生不具备 Iterator 接口，无法用for...of遍历。
// 这时，我们通过 Generator 函数objectEntries为它加上遍历器接口，就可以用for...of遍历了。
// 加上遍历器接口的另一种写法是，将 Generator 函数加到对象的Symbol.iterator属性上面。
function* objectEntries(){
  let propKeys = Object.keys(this);

  for(let propKey of propKeys){
    yield [propKey, this[propKey]];
  }
}

jane = {first: "jane", last : "Doe"};
jane[Symbol.iterator] = objectEntries;

for(let [key,val] of jane){
  console.log(`${key}: ${val}`);
}

// 除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，
// 都是遍历器接口。
// 这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数。
function* numbers() {
  yield 1;
  yield 2;
  return 3;
  yield 4;
}

[...numbers()];
Array.from(numbers());

let [x, y] = numbers();

for(let n of numbers()){
  console.log(n);
}
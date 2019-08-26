// yield 表达式
// 由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，
// 所以其实提供了一种【可以暂停执行的函数】。yield表达式就是暂停标志。

// 遍历器对象的next方法的运行逻辑如下。
/*  
  （1）遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
  （2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
  （3）如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
  （4）如果该函数没有return语句，则返回的对象的value属性值为undefined。
  需要注意的是，yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，
  因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
*/
function* f() {
  console.log("It's called.");
}
let g = f();
setTimeout(() => {
  g.next();
}, 2000);

let arr = [1, [[2, 3], 4], [5, 6]];
let a = [];
let flat = function*(a) {
  let length = a.length;
  for (let i = 0; i < length; i++) {
    let item = a[i];
    if (isArray(item)) yield* flat(item);
    else yield item;
  }
};
for (let f of flat(arr)) {
  a.push(f);
}

function isArray(arr) {
  return Array.isArray(arr);
  // OR
  return Reflect.toString.call(arr).slice(8, -1) === "Array";
}


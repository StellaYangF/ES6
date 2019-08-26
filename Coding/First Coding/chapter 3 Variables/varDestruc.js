/*1.destructing ES6允许按一定模式，从数组和对象提取值，对变量赋值 == ‘模式匹配’*/

let a = 1,
  b = 2,
  c = 3;
let [a, b, c] = [1, 2, 3];
let [a, [b, c]] = [1, [2, 3]];
let [, , c] = ["h", "e", "l"];
let [head, ...tail] = [1, 2, 3, 4, 5];
let [x, y, ...z] = ["foo"]; //解构不成功，变量为undefined/ []
let [a, [b], c] = [1, [2, 4], 5];
let [foo] = 1;

//TypeError: 1 is not iterable   右边不是可遍历的结构，报错(1, NaN, undefined, false, null, {})
// 前5个不能转对象不具备Iterator接口；而{}不具备Iterator接口

let [x, y, z] = new Set(["a", "b", "c"]);

function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const arr = ["apple", "pear", "banana", "grapes"];
const obj = {};

obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for (let fruit of obj) {
  console.log(fruit);
}
// apple
// pear
// banana
// grapes


// for...of只返回具数字索引的属性,非数字索引会默认隐藏
let arr = [ 1, 2, 4, 5 ];
arr.six = 6;
for (let i in arr) {
  console.log("for...in index：", i);
}
//拿索引
// for...in index 0
// for...in index 1
// for...in index 2
// for...in index 3
// for...in index six 

for (let n of arr) {
  console.log("for...of number：", n);
}
// 拿数组元素
// for...of number： 1
// for...of number： 2
// for...of number： 4
// for...of number： 5

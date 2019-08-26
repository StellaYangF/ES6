// for...of循环可以使用的范围包括:
// 数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、
// 后文的 Generator 对象，以及字符串。

// (1) 数组
// 数组原生具备iterator接口（即默认部署了Symbol.iterator属性），
// for...of循环本质上就是调用这个接口产生的遍历器，可以用下面的代码证明。
const arr = ['red', 'green', 'blue'];
for(let c of arr){
  console.log(c);
}
//  red green blue

const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for(let item of obj){
  console.log(item);
}

// 上面代码中，空对象obj部署了数组arr的Symbol.iterator属性，结果obj的for...of循环，产生了与arr完全一样的结果。

// for...of循环可以代替数组实例的forEach方法。

arr.forEach((val, index)=> {
  console.log(val);
  console.log(index);
})

// (2) Set 和 Map 结构
// Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用for...of循环。
let engines = new Set(['Gecko', 'Trident', 'Webkit', 'Webkit']);
for(let e of engines){
  console.log(e);
}
// Gecko
// Trident
// 

let es6 = new Map();
es6.set("edition", 6)
.set("committee", "TC39")
.set("standard", "ECMA-262");
for(let [name, value] of es6){
  console.log(name + ": "+ value);
}


// (3) 计算生成的数据结构
// 有些数据结构是在现有数据结构的基础上，计算生成的。
// 比如，ES6 的数组、Set、Map 都部署了以下三个方法，调用后都返回遍历器对象。
let arr = ['a', 'b', 'c'];

for(let pair of  arr.entries()){
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']


// (4) 类似数组的对象
// 类似数组的对象包括好几类。
// 下面是for...of循环用于：
// 字符串、DOM NodeList 对象、arguments对象的例子。
// string
str= "hello"
for(let i of str){
  console.log(i); // h e l l o
}

// NodeList
divs = document.querySelectorAll("div");
for(let div of divs){
  div.classList.add("test");
  console.log(div.classList);
}

// arguments
function printArgs(){
  for(let x of arguments){
    console.log(x);
  }
}
printArgs('a', 'b', 'c');
// 'a'
// 'b'
// 'c'


// 对于字符串来说，for...of循环还有一个特点，就是会正确识别 32 位 UTF-16 字符。
for (let x of 'a\uD83D\uDC0A') {
  console.log(x);
}
// 'a'
// '\uD83D\uDC0A'

// 并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。

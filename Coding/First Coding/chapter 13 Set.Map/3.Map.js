// 1: 含义和基本用法
// JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），
// 但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
const data = {};
const element = document.getElementById("myDiv");

data[element] = "metadata";
data["[object HTMLDivElement]"]; // "metadata"
element.toString(); //"[object HTMLDivElement]"
// 上面代码原意是将一个 DOM 节点作为对象data的键，
// 但是由于对象只接受字符串作为键名，
// 所以element被自动转为字符串[object HTMLDivElement]。

// 2: 为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，
// 但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
// 也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
// 如果你需要“键值对”的数据结构，Map 比 Object 更合适。
const m = new Map();
const o = { p: "Hello World" };

m.set(o, "content");
m.get(o); // "content"

m.has(o); // true
m.delete(o); // true
m.has(o); // false

// 3:上面的例子展示了如何向 Map 添加成员。作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
map = new Map([["name", "Tom"], ["title", "Programmer"]]);
map.has("name"); // true
map.has("Tom"); // false
map.get("title"); // programmer

// Map构造函数接受数组作为参数，实际上执行的是下面的算法
const items = [["name", "张三"], ["title", "Author"]];

const map = new Map();
items.forEach(
  ([key, value]) => map.set(key, value) // 解构赋值array.forEach([key,value])
);

// 4: 事实上，不仅仅是数组，
// 任何具有 Iterator 接口、
// 且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数。
// 这就是说，Set和Map都可以用来生成新的 Map。
set = new Set([["foo", 1], ["bar", 2]]);
m1 = new Map(set);
m1.get("foo");

m2 = new Map([["baz", 3]]);
m3 = new Map(m2);
m3.get("baz");

// 5: 如果对同一个键多次赋值，后面的值将覆盖前面的值。
map = new Map();

map.set(1, "aaa").set(1, "bbb");

map.get(1); // "bbb"

// 6: 如果读取一个未知的键，则返回undefined。
map.get("asfeg"); // undefined

// 7: 注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
map = new Map();
map.set(["a"], 555);
map.get(["a"]);

// 8: Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
// 这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，
// 如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

// 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），
// 则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。
// 另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。

map = new Map();
map.set(0, 123);
map.get(-0); // 123

map.set(true, 1);
map.set("true", 2);
map.get(true); // 1

map.set(undefined, 3);
map.set(null, 4);
map.get(undefined); // 3

map.set(NaN, 123);
map.get(NaN); // 123

// 9:实例的属性和操作方法
// （1）size 属性

// （2）Map.prototype.set(key, value)

// （3）Map.prototype.get(key)

// （4）Map.prototype.has(key)

// （5）Map.prototype.delete(key)

// （6）Map.prototype.clear()

// 10: 遍历方法
// Map 结构原生提供三个遍历器生成函数和一个遍历方法。
/* 
  Map.prototype.keys()：返回键名的遍历器。
  Map.prototype.values()：返回键值的遍历器。
  Map.prototype.entries()：返回所有成员的遍历器。
  Map.prototype.forEach()：遍历 Map 的所有成员。      === Map[Symbol.iterator]
*/ 
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
// 上面代码最后的那个例子，表示 Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
Map.prototype.entries === Map.prototype[Symbol.iterator]    // true
Map.entries === Map[Symbol.iterator]        // true

// 11:Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]


// 12: 结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
    );
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}

//13: Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。
map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});

// 13.1 forEach方法还可以接受第二个参数，用来绑定this。
reporter = {
  report: (key, value) => {
    console.log("Key:%s, Value: %s", key, value);// %s个人理解为占位符？
  }
}

map.forEach((value, key, map)=>{//箭头函数没有this指向，内部调用时，永远指向外层的this
  console.log(this);      // this refers to window
  this.reporter(key, value)
},reporter)

// 正解
map.forEach(function(value, key, map){
  console.log(this);     // this refers to reporter
  this.report(key, value);
},reporter)

// 14: 与其他数据结构的互相转换
// （1）Map 转为数组
// 前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（...）。
map = new Map()
  .set(true, 7)
  .set({foo:3}, ['abc']);
[...map]
  .flat([Infinity])     
// 继续拉平

// （2）数组 转为 Map
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }

// （3）Map 转为对象
// 3.1 如果所有 Map 的键都是字符串，它可以无损地转为对象。
function strMap2Obj(strMap){
  let obj = Object.create(null);      // 无任何继承类、 无任何父类
  strMap.forEach((v, k)=> obj[k]=v);
  return obj;
}
const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap);
// { yes: true, no: false }

// 3.2 如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

// （4）对象转为 Map
function obj2StrMap(obj){
  let map = new Map();
  Object.entries(obj).forEach(([k,v])=> map.set(k,v));
  return map;
}
obj2StrMap({yes: true, no: false})

// （5）Map 转为 JSON
// 转对象JSON
function strMap2Json(strMap){
  return JSON.stringify(strMap2Obj(strMap));
}
map = new Map().set('yes',  true).set('no', false);
strMap2Json(map);
// "{"true":"yes","false":"no"}"

// 另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。
// 转数组JSON
function map2ArrayJson(map){
  return JSON.stringify([...map]);
}
map = new Map().set(true, 7).set({'foo': 3}, ['abc']);
map2ArrayJson(map);
// "[[true,7],[{"foo":3},["abc"]]]"

// （6）JSON 转为 Map
// JSON 转为 Map，正常情况下，所有键名都是字符串。
function json2StrMap(jsonStr){
  return obj2StrMap(JSON.parse(jsonStr));
}

json2StrMap('{"yes": true, "not": false}');
// Map {'yes' => true, 'no' => false}


// 但是，有一种特殊情况，整个 JSON 就是一个数组，
// 且每个数组成员本身，又是一个有两个成员的数组。
// 这时，它可以一一对应地转为 Map。
// 这往往是 Map 转为数组 JSON 的逆操作。
function json2Map(jsonStr){
  return new Map(JSON.parse(jsonStr));
}
json2Map('[[true,7],[{"foo":3},["abc"]]]');
// Map {true => 7, Object {foo: 3} => ['abc']}

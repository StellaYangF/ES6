// 1: 上面代码通过add()方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。
let s = new Set();
[2, 3, 5, 4, 5, 2, ,2].forEach(x=>s.add(x));
for(let key of s){
  console.log(key);     
}
// 2 3 5 4

// 2: Set函数可以接受一个数组（或者【有 iterable 接口的其他数据结构】）作为参数，用来初始化。
s = new Set([1,2,3,4,5,6,7]);
[...s];
s.size    //  7

items = new Set('tommonkey');
[...items]    // ["t", "o", "m", "n", "k", "e", "y"]

// 类似于
[..."tommonkey"].forEach(x=>s.add(x));

// 3: 上面代码也展示了一种去除数组重复成员的方法。

[...new Set(array)];

// 4: 上面的方法也可以用于，去除字符串里面的重复字符。
[...new Set(string)].join('')

// 5: 向 Set 加入值的时候，不会发生类型转换
// 所以5和"5"是两个不同的值。Set 内部判断两个值是否不同，
// 使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===）
//  Set 加入值时认为【NaN等于自身】，而精确相等运算符认为NaN不等于自身。
set = new Set();
a = NaN;
b = NaN;
set.add(a);
set.add(b);

// 5.1 两个对象总是不相等的。
set.add({})
set.add({})
set.add([])
set.add([])

// 6: property & methods/ functions
/*  
  add: ƒ add()
  clear: ƒ clear()
  constructor: ƒ Set()
  delete: ƒ delete()
  entries: ƒ entries()
  forEach: ƒ forEach()
  has: ƒ has()
  keys: ƒ values()
  size: 7
  values: ƒ values()
  Symbol(Symbol.iterator): ƒ values()
  Symbol(Symbol.toStringTag): "Set"
  get size: ƒ size()
*/
s.add(1).add(2).add(2);
s.size
s.has(1);
s.delete(2);
s.clear();

// 7： 下面是一个对比，看看在判断是否包括一个键上面，Object结构和Set结构的写法不同。
let properties = {
  "width": 1,
  "height":1,
}
if(properties['width']){
  // do something....
}

// Set的写法
properties = new Set();
properties.add('width');
properties.add('height');

if(properties.has('width')){
  // do something
}

// 8: Array.from方法可以将 Set 结构转为数组。
items = new Set([1,2,3,4,5,6,3]);
array = Array.from(items);

// 9: 这就提供了去除数组重复成员的另一种方法。
function dedupe(array){
  return Array.from(new Set(array));
}
dedupe([1,2,3,4,2,2,4,4]);

// 10: 遍历操作
// 10.1: Set 结构的实例有四个遍历方法，可以用于遍历成员。
/*  
  Set.prototype.keys()：返回键名的遍历器
  Set.prototype.values()：返回键值的遍历器
  Set.prototype.entries()：返回键值对的遍历器
  Set.prototype.forEach()：使用回调函数遍历每个成员
*/
//需要特别指出的是，Set的遍历顺序就是插入顺序。
// 这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，
// 调用时就能保证按照添加【顺序调用】。 
funs = new Set(
  ()=>{console.log(1111)},
  ()=>{setTimeout(()=>{console.log(2222)},1000)},
  ()=>{console.log(333)}
);    // Error

// （1）keys()，values()，entries()
  // keys方法、values方法、entries方法返回的都是【遍历器对象】（详见《Iterator 对象》一章）。
  // 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），
  // 所以keys方法和values方法的行为完全一致。
set = new Set(['red', 'yellow', 'blue']);
for(let item of set.values()){
  console.log(item);
}
for(let item of set.keys()){
  console.log(item);
}
for(let item of set.entries()){
  console.log(item);
}
// ['red', 'red'] 
// ['yellow', 'yellow']
// ['blue', 'blue']

// 上面代码中，entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。

// Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
Set.prototype[Symbol.iterator] === Set.prototype.values // true
Set.prototype[Symbol.iterator] === Set.prototype.keys // true
Set.prototype[Symbol.iterator] === Set.prototype.entries // false

// 这意味着，可以省略values方法，直接用for...of循环遍历 Set。
for(let item of set){
  console.log(item);
}

// （2）forEach()
// Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
set.forEach((key, value)=>{
  console.log(`${key}: ${value}`);
})
// 'red': 'red']
// 'yellow': 'yellow'
// 'blue': 'blue'


// 使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。
a = new Set([1,2,3,4])
b = new Set([4,3,2,6,1])
// 并集
union = new Set([...a, ...b]);
// 交集
intersect = new Set([...a].filter(x=>b.has(x)));
// 差集
difference = new Set([...a].filter(x=>!b.has(x)));    // Set(0){}
difference = new Set([...b].filter(x=>!a.has(x)));    // Set(1){6}


// 如果想在遍历操作中，同步改变原来的 Set 结构，
// 目前没有直接的方法，但有两种变通方法。
// 一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；
// 另一种是利用Array.from方法。
set = new Set([1,2,3]);
set = new Set([...set].map(x=>x*2));
set = new Set(Array.from(set).map(x=>x*3));
// 上面代码提供了两种方法，直接在遍历操作中改变原来的 Set 结构。




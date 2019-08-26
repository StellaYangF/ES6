// 数组的空位

// 下面再看另一个例子。

const a1 = [undefined, undefined, undefined];
const a2 = [, , ,];

a1.length // 3
a2.length // 3

a1[0] // undefined
a2[0] // undefined

a1[0] === a2[0] // true

// 上面代码中，数组a1的成员是三个undefined，数组a2的成员是三个空位。这两个数组很相似，长度都是 3，每个位置的成员读取出来都是undefined。

// 但是，它们实际上存在重大差异。

0 in a1 // true
0 in a2 // false

a1.hasOwnProperty(0) // true
a2.hasOwnProperty(0) // false

Object.keys(a1) // ["0", "1", "2"]
Object.keys(a2) // []

a1.map(n => 1) // [1, 1, 1]
a2.map(n => 1) // [, , ,]
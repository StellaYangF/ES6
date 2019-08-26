class MyArray extends Array {
}

// 衍生对象
const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

console.log(b instanceof MyArray); // true
console.log(c instanceof MyArray); // true

// get取值器
class MyArray1 extends Array {
  static get [Symbol.species]() { return Array }
}
const d = new MyArray1(1, 2, 3);
const e = a.map(x => x);
const f = a.filter(x => x > 1);

console.log(e instanceof MyArray1); // false
console.log(f instanceof MyArray1); // false
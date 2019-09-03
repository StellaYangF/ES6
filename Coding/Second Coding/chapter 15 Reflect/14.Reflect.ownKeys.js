// Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
const obj = {
  foo :1 , 
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
}

Object.getOwnPropertyNames(obj);
Object.getOwnPropertySymbols(obj);


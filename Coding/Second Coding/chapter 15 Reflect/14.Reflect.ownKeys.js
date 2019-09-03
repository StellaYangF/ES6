// Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
const obj = {
  foo :1 , 
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
}

Object.getOwnPropertyNames(obj);
// ['foo', 'bar']
Object.getOwnPropertySymbols(obj);
//[Symbol(baz), Symbol(bing)]
Reflect.ownKeys(obj);
// ['foo', 'bar', Symbol(baz), Symbol(bing)]

// 如果Reflect.ownKeys()方法的第一个参数不是对象，会报错。


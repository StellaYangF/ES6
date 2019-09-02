// Reflect.getPrototypeOf方法用于读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
class Person {
  constructor (name) {
    this.name = name;
  }
}
const p = new Person('Tom');
Reflect.getPrototypeOf(p) === Person.prototype;
// true

// Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，如果参数不是对象，
// Object.getPrototypeOf会将这个参数转为对象，然后再运行，而Reflect.getPrototypeOf会报错。
Object.getPrototypeOf('tom');   // String
Reflect.getPrototypeOf('tom');  // Uncaught TypeError: Reflect.getPrototypeOf called on non-object
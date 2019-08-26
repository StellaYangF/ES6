class Person {
  get [Symbol.toStringTag] () {
    return this.constructor.name;
  }
}
Object.prototype.toString.call(new Person());
// "[object Person]"

class Student extends Person {}
Object.prototype.toString.call(new Student());
// "[object Student]"

class ObjectModel extends Object {}
Object.prototype.toString.call(new ObjectModel());
// "[object Object]"
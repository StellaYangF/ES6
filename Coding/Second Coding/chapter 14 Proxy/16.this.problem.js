// 1) example 1:
const target = {
  m () {
    console.log(this === p);
  }
}

const handler = {};
const p = new Proxy(target, handler) ;
target.m(); // false
p.m();  //true

// 2) example 2: 
const _name = new WeakMap();
class Person {
  constructor (name) {
    _name.set(this, name);
  }
  get name () {
    return _name.get(this);
  }
}

const jane = new Person('Jane');
jane.name // 'Jane
const p = new Proxy(jane, {});
p.name // undefined

// 2) example 2: 
// 有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性。
const target = new Date();
const handler = {};
const p = new Proxy(target, handler);
p.getDate();
// Uncaught TypeError: this is not a Date object.

// 3) example 3: 
const target = new Date('2019-09-02');
const hanlder = {
  get (target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const p = new Proxy(target, hanlder);
p.getDate();  // 2
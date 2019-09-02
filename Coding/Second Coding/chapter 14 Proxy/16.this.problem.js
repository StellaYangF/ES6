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


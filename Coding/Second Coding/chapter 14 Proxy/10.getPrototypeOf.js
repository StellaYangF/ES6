// 1) example 1: 
const proto = {};
const p =new Proxy({}, {
  getPrototypeOf (target) {
    return proto;
  }
})
Object.prototype.isPrototypeOf(p);    //  true
Object.getPrototypeOf(p)  === proto;  // true
Reflect.getPrototypeOf(p)  === proto;  // true

// 2) 若目标对象不可扩展，getPrototypeOf方法必须返回目标对象的原型对象
const proto = {};
const target = { name: "tom" };
Object.preventExtensions(target);
const p =new Proxy(target, {
  getPrototypeOf (target) {
    return proto;
  }
})
Reflect.getPrototypeOf(p)  === proto;    
// Uncaught TypeError: 'getPrototypeOf' on proxy: 
// proxy target is non-extensible 
// but the trap did not return its actual prototype

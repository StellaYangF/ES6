// 1) example 1: 
const handler = {
  setPrototypeOf (target, proto) {
    throw new Error('Changing the prototype is forbidden');
  }
}
const proto = {};
const target = function () {};
const p = new Proxy(target, handler);
Object.setPrototypeOf(p, proto);
// Uncaught Error: Changing the prototype is forbidden

// 2) 该方法只能返回布尔值，否则会被自动转为布尔值。
const handler = {
  setPrototypeOf (target, proto) {
    return '123';
  }
}
const proto = {};
const target = function () {};
const p = new Proxy(target, handler);
Object.setPrototypeOf(p, proto);

// 3) 如果目标对象不可扩展（non-extensible），setPrototypeOf方法不得改变目标对象的原型。
const handler = {
  setPrototypeOf (target, proto) {
    return true;
  }
}
const proto = {};
const target = function () {};
Object.preventExtensions(target);
const p = new Proxy(target, handler);
Object.setPrototypeOf(p, proto);
// Uncaught TypeError: 'setPrototypeOf' on proxy: trap returned truish for setting a new prototype on the non-extensible proxy target
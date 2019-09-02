// 1) example:
const obj = {
  foo: 1,
  set bar (value) {
    return this.foo = value;
  }
}
obj.foo
Reflect.set(obj, 'foo', 2);
obj.foo // 2
Reflect.set(obj, 'bar', 3);
obj.foo // 3

// 2）example: 如果name属性设置了赋值函数，则赋值函数的this绑定receiver。
const obj = {
  foo: 1,
  set bar (value) {
    return this.foo = value;
  }
}
const receiveObj = {
  foo: 0,
}
Reflect.set(obj, 'bar', 3, receiveObj);
receiveObj.foo; // 3
obj.foo;  // 1

// 3) example: 注意，如果 Proxy对象和 Reflect对象联合使用，
// 前者拦截赋值操作，后者完成赋值的默认行为，而且传入了receiver，
// 那么Reflect.set会触发Proxy.defineProperty拦截。
const p = { a: "a" };
const handler = {

  set (target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value, receiver);
  },

  defineProperty (target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
}
const obj = new Proxy(p, handler);
obj.a = 'A';
// set
// defineProperty

// 4）如果Reflect.set没有传入receiver，那么就不会触发defineProperty拦截。
const p = { a: "a" };
const handler = {

  set (target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value);
  },

  defineProperty (target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
}
const obj = new Proxy(p, handler);
obj.a = 'A';
// set

// 5） 如果第一个参数不是对象，Reflect.set会报错。
Reflect.set(1, 'foo', {});// 报错
Reflect.set(false, 'foo', {}) // 报错
// Uncaught TypeError: Reflect.set called on non-object


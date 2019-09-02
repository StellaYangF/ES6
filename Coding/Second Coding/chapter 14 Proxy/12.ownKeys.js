// # 拦截Object.keys()
// 1) example 1: 
const target = {
  a: 1,
  b: 2,
  c: 3,
}

const handler = {
  ownKeys (target) {
    return ['a']
  }
}
const p = new Proxy(target, handler);
Object.keys(p);   // ['a']

// 2) example 2: 拦截私有属性名"_"开头
const target = {
  _bar: 'bar',
  _foo: 'foo',
  prop: 'prop',
};
const handler = {
  ownKeys (target) {
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
}
const p = new Proxy(target, handler);
for (let key of Object.keys(p)) {
  console.log(p[key]);
}
// prop

// Note: Object.keys，三类属性被自动过滤，不会返回
// 1. 目标对象上不存在的属性
// 2. 属性名为Symbol值
// 3. 不可遍历的属性
const target = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.for('secret')]: '4',
};
Object.defineProperty(target, 'key', {
  enumerable: false,
  writable: true,
  configurable: true,
  value: 'static',
});
const handler = {
  ownKeys (target) {
    return ['a', 'd', Symbol.for('secret'), 'key'];
  }
}
const p = new Proxy(target, handler);
Object.keys(p); // [ 'a' ]

// # 拦截Object.getOwnPropertyNames
const p = new Proxy({}, {
  ownKeys (target) {
    return ['a', 'b', 'c'];
  }
})
Object.getOwnPropertyNames(p);
// ["a", "b", "c"]

// # 拦截for...in
const obj = { hello: 'world' };
const p = new Proxy(obj, {
  ownKeys (target) {
    return ['a', 'b'];
  }
})

for (let key in p) {
  console.log(key);
}
// 没有任何输出，obj没有这两个属性

// ownKeys方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错。
const obj = {};
const p = new Proxy(obj, {
  ownKeys (target) {
    return [123, true, undefined, null, {}, []];
  }
})
Object.getOwnPropertyNames(p);
// Uncaught TypeError: 123 is not a valid property name

// 如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys方法返回，否则报错
const obj = {};
Object.defineProperty(obj, 'a', {
  configurable: false,
  enumerable: true,
  value: 10,
})
const p = new Proxy(obj, {
  ownKeys (target) {
    return ['b'];
  }
})
Object.getOwnPropertyNames(p);
// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'

// 如果目标对象是不可扩展的（non-extensible），这时ownKeys方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性，否则报错。
const obj = {
  a: 1,
};
Object.preventExtensions(obj);
const p = new Proxy(obj, {
  ownKeys (target) {
    return ['a', 'b'];
  }
})
Object.getOwnPropertyNames(p);
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
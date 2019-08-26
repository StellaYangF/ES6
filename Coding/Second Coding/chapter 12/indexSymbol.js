const FOO_KEY = Symbol('foo');
global[FOO_KEY] = { foo: "world" };

const a = require('./singletonSymbol.js');
console.log(a.foo);

// 每次得到的FOO_KEY都是不一样的
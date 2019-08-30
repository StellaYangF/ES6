// global._foo is global and writable

// global._foo = { foo: 'world' };

const a = require('./singleton.js');
console.log(a.foo);
global[Symbol.for('foo')] = { foo: "world" } ;
const a = require('./singletonSymbol.for.js/index.js');
console.log(a.foo);
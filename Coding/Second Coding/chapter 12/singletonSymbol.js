const FOO_KEY = Symbol('foo');

function A () {
  this.foo = 'hello';
}

global[FOO_KEY] ? '': global[FOO_KEY] = new A();

module.exports = global[FOO_KEY];
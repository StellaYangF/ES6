const a = [[1,2], [3, 4]];
const ws = new WeakSet(a);
console.log(ws);
// WeakSet {[1, 2], [3, 4]}
// 数组成员，必须是对象

const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)

// store DOM nodes to avoid storage leak
const foos = new WeakSet();
class Foo {
  constructor () {
    foos.add(this);
  }

  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method只能在Foo实例上调用!')
    }
  }
}
let ws = new Foo();

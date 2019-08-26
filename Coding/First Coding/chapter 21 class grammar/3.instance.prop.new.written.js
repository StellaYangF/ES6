// 实例属性的新写法
// 实例属性除了定义在constructor()方法里面的this上面，也可以定义在类的最顶层。

class IncreasingCounter {
  constructor() {
    this._count = 0;
  }
  get value() {
    console.log("Getting the current value!");
    return this._count;
  }
  increment() {
    this._count++;
  }
}

// simplied :
class IncreasingCounter {
  _count = 0;
  get value() {
    console.log("Getting the current value!");
    return this._count;
  }
  increment() {
    this._count++;
  }
}
// 上面代码中，实例属性_count与取值函数value()和increment()方法，处于同一个层级。
// 这时，不需要在实例属性前面加上this。

// 这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，
// 看上去比较整齐，一眼就能看出这个类有哪些实例属性。

class foo {
  bar = 'hello';
  baz = "world";
  constructor (){
    // ...
    this.foo = "Bnjour!";
  }
}
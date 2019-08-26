// 在修饰器的基础上，可以实现Mixin模式。
// 所谓Mixin模式，就是对象继承的一种替代方案，中文译为“混入”（mix in），
// 意为在一个对象之中混入另外一个对象的方法。

// 请看下面的例子。

const Foo = {
  foo() { console.log('foo') }
};

class MyClass {}

Object.assign(MyClass.prototype, Foo);

let obj = new MyClass();
obj.foo() // 'foo'

// 上面代码之中，对象Foo有一个foo方法，通过Object.assign方法，可以将foo方法“混入”MyClass类，
// 导致MyClass的实例obj对象都具有foo方法。这就是“混入”模式的一个简单实现。

// 下面，我们部署一个通用脚本mixins.js，将 Mixin 写成一个修饰器。

export function mixins(...list) {
  return target => {
    Object.assign(target.prototype, ...list);
  }
}

// 然后，就可以使用上面这个修饰器，为类“混入”各种方法。

import { mixins } from './mixins';

const Foo = {
  foo() {console.log('foo')};
}
const Bar = {
  bar() {console.log('bar'
}

@mixins(Foo)
class  MyClass{}
let obj = new MyClass();
obj.foo();    // 'foo'
obj.bar();    // 'bar'

// 通过mixins这个修饰器，实现了在MyClass类上面“混入”Foo对象的foo方法。

// 不过，上面的方法会改写MyClass类的prototype对象，如果不喜欢这一点，也可以通过类的继承实现 Mixin。

class MyClass extends MyBaseClass {

}

// 上面代码中，MyClass继承了MyBaseClass。如果我们想在MyClass里面“混入”一个foo方法，
// 一个办法是在MyClass和MyBaseClass之间插入一个混入类，这个类具有foo方法，
// 并且继承了MyBaseClass的所有方法，然后MyClass再继承这个类。

let MyMixin = (superclass) => class extends superclass {
  foo() {
    console.log('foo from MyMixin');
  }
}



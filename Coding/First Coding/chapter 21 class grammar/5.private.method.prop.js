// 私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。
// 这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

// 一种做法是在命名上加以区别。

class Widget {
  // public method
  foo(baz) {
    this._bar(baz);
  }
  // private method
  _bar(baz) {
    return (this.snaf = baz);
  }
}

// 上面代码中，_bar方法前面的下划线，表示这是一个只限于内部使用的私有方法。
// 但是，这种命名是不保险的，在类的外部，还是可以调用到这个方法。

// 另一种方法就是索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。
class Widget {
  foo(baz) {
    bar.call(this, baz);
  }
}

function bar(baz) {
  return (this.snaf = baz);
}
// 上面代码中，foo是公开方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法。

//还有一种方法是利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。
const bar = Symbol("bar");
const snaf = Symbol("snaf");

export default class myClass {
  foo(baz) {
    this[bar](baz);
  }
  [bar](baz) {
    return (this[snaf] = baz);
  }
}
// 上面代码中，bar和snaf都是Symbol值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。
// 但是也不是绝对不行，Reflect.ownKeys()依然可以拿到它们。

const inst = new myClass();
Reflect.ownKeys(myClass.prototype);
// [ 'constructor', 'foo', Symbol(bar) ]

// 私有属性的提案
// 目前，有一个提案，为class加了私有属性。方法是在属性名之前，使用#表示。

class IncreasingCoutner {
  #count = 0;
  get value () {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#coutn ++;
  }
}
// 上面代码中，#count就是私有属性，只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错。

const counter = new IncreasingCounter();
counter.#count // 报错
counter.#count = 42 // 报错

// 上面代码在类的外部，读取私有属性，就会报错。

// 上面代码中，#totallyRandomNumber是私有属性，#computeRandomNumber()是私有方法，
// 只能在FakeMath这个类的内部调用，外部调用就会报错。


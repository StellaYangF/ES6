// [说明] Decorator 提案经过了大幅修改，目前还没有定案，不知道语法会不会再变。
// 下面的内容完全依据以前的提案，已经有点过时了。等待定案以后，需要完全重写。

// 类的修饰
// 许多面向对象的语言都有修饰器（Decorator）函数，用来修改类的行为。
// 目前，有一个提案将这项功能，引入了 ECMAScript。

@testable
class MyTestableClass {
  // ...
}
function testable(target) {
  target.isTestable = true;
}
MyTestableClass.isTestable  // true

// 上面代码中，@testable就是一个修饰器。
// 它修改了MyTestableClass这个类的行为，为它加上了静态属性isTestable。
// testable函数的参数target是MyTestableClass类本身。

// 基本上，修饰器的行为就是下面这样。

@decorator
class A {}

// equals
class A {}
A = decorator(A) || A;

// 也就是说，修饰器是一个对类进行处理的函数。修饰器函数的第一个参数，就是所要修饰的目标类。

// 如果觉得一个参数不够用，可以在修饰器外面再封装一层函数。

function testable(isTestable) {
  return function(target) {
    target.isTestable = isTestable;
  }
}
@testable(true);
MyTestableClass{}
MyTestableClass.isTestable // true

@testable(false);
MyTestableClass{}
MyTestableClass.isTestable // false

// 上面代码中，修饰器testable可以接受参数，这就等于可以修改修饰器的行为。

// 注意，修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。
// 这意味着，修饰器能在编译阶段运行代码。也就是说，修饰器本质就是编译时执行的函数。

// 前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的prototype对象操作。
const testable = target => {target.prototype.isTestable = true;}

@testable 
class MyTestableClass{}
let obj = new MyTestableClass();
obj.isTestable // true

// 上面代码中，修饰器函数testable是在目标类的prototype对象上添加属性，因此就可以在实例上调用。

// 下面是另外一个例子。
// mixins.js
export function mixins(...list) {
  return target => {
    Object.assign(target.prototype, ...list);
  }
}

// main.js
import {mixins} from './mixins'

const Foo = {
  foo() {console.log('foo')};
}

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo();  // 'foo'


// 上面代码通过修饰器mixins，把Foo对象的方法添加到了MyClass的实例上面。可以用Object.assign()模拟这个功能。
const Foo = {
  foo() { console.log('foo') }
}

class MyClass{}
Object.assign(MyClass.prototype, Foo);
let obj = new MyClass();
obj.foo();    // 'foo'


// 实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。
class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispathcToProps)(MyReactComponent);

// 有了装饰器，就可以改写上面的代码。

@connect(mapStateToProps, mapDispathcToProps) 
export default class MyReactComponent extends React.Component {}

// 相对来说，后一种写法看上去更容易理解。


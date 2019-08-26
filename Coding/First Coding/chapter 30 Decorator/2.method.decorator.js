// 方法的修饰
// 修饰器不仅可以修饰类，还可以修饰类的属性。

class Person {
  @readonly 
  name () {return `${this.first} ${this.last}`}
}

// 上面代码中，修饰器readonly用来修饰“类”的name方法。
// 修饰器函数readonly一共可以接受三个参数。
function readonly (target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
readonly(Person.prototype, 'name', descriptor);
// like
Object.defineProperty(Person.prototype, name, descriptor);

// 修饰器第一个参数是类的原型对象，上例是Person.prototype，修饰器的本意是要“修饰”类的实例，
// 但是这个时候实例还没生成，所以只能去修饰原型（这不同于类的修饰，那种情况时target参数指的是类本身）；
// 第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象。

// 另外，上面代码说明，修饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。

// 下面是另一个例子，修改属性描述对象的enumerable属性，使得该属性不可遍历。

class Person {
  @nonenumerable
  get kidCount() { return this.chidlren.length;}
}
function nonenumerable(target, name, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}

// 下面的@log修饰器，可以起到输出日志的作用。

class Math {
  @log
  add(a, b) {
    return a + b;
  }
}
function log (target, name, descriptor) {
  let oldValue = descriptor.value;

  descriptor.value = function() {
    console.log(`calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  }
  return descriptor;
}

const math = new Math();

math.add(2, 4);
// passed parameters should get logged now

// 上面代码中，@log修饰器的作用就是在执行原始的操作之前，执行一次console.log，从而达到输出日志的目的。

// 修饰器有注释的作用。
@testable
class Person {
  @readonly
  @nonenumerable
  name () { return `${this.first} ${this.last}`}
}

// 从上面代码中，我们一眼就能看出，Person类是可测试的，而name方法是只读和不可枚举的。

// 下面是使用 Decorator 写法的组件，看上去一目了然。

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss'
})
export class MyComponent {
  @prop() first: string;
  @prop() last: string;
  @State() isVisible: boolean = true;

  render() {
    return {
      <p> Hello, my name is ${this.first} ${this.last}</p>
    }
  }
}

// 如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。

function dec(id) {
  console.log('evaluated', id);
  return (target, property, descriptor) => console.log('executed', id);
}
class Example {
  @dec(1)
  @dec(2)
  MSInputMethodContext(){}
}

// 上面代码中，外层修饰器@dec(1)先进入，但是内层修饰器@dec(2)先执行。

// 除了注释，修饰器还能用来类型检查。所以，对于类来说，这项功能相当有用。从长期来看，它将是 JavaScript 代码静态分析的重要工具。


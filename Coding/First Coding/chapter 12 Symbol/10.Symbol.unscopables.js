Array.prototype[Symbol.unscopables]
// 对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。

/*  
{
  copyWithin: true
  entries: true
  fill: true
  find: true
  findIndex: true
  flat: true
  flatMap: true
  includes: true
  keys: true
  values: true
}
*/

// 上面代码说明，数组有 7 个属性，会被with命令排除。

// example
// without Symbol.unscopables
class MyClass{
  foo () { return 1; }
  bar () { return 3; }
  get[Symbol.unscopables] () {
    return {
      foo: true, 
    }
  }
}
const foo = () => 2;

with(MyClass.prototype) {
  console.log(foo());
  console.log(bar());
}
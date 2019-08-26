// 实例：使用 Proxy 实现观察者模式
// 观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。

// 观察目标
const person = observable({
  name: "tom",
  age: 20
});

// 观察者1
function print(){
  console.log(`${person.name}, ${person.age}`)
}
// 观察者2
function intr(){
  console.log(`Hello, I am ${this.name} and ${this.age} years old.`)
}

// 上面代码中，数据对象person是【观察目标】，函数print是【观察者】。
// 一旦数据对象发生变化，print就会自动执行。

// 下面，使用 Proxy 写一个观察者模式的最简单实现，
// 即实现observable和observe这两个函数。
// 思路是observable函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  if(value !== target[key]){
    // 若新旧值不相等才执行
    const result = Reflect.set(target, key,  value, receiver);
    // 返回的是修改后的值 value
    // 属性对象的赋值函数实现 观察者执行数据变化的函数
    queuedObservers.forEach(observer => observer());
    return result;
  }
}

// 上面结合
observe(print);
person.name = 'linda';
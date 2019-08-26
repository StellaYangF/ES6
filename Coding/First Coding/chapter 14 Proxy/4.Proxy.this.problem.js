// 虽然 Proxy 可以代理针对目标对象的访问，
// 但它不是目标对象的透明代理，
// 即不做任何拦截的情况下，也无法保证与目标对象的行为一致。
// 主要原因就是在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。

const target = {
  m(){
    console.log(this === p);
  }
}

const handler = {};
const p = new Proxy(target, handler);

target.m(); // false;
p.m(); // true
// 上面代码中，一旦proxy代理target.m，后者内部的this就是指向proxy，而不是target。

// 下面是一个例子，由于this指向的变化，导致 Proxy 无法代理目标对象。
const _name = new WeakMap();
class Person{
  constructor(name){
    _name.set(this, name);
  }
  get name(){
    return _name.get(this);
  }
}
const jane = new Person("Jane");
jane.name   //'Jane'
const p = new Proxy(jane, {});
p.name  // undefined
// 上面代码中，目标对象jane的name属性，实际保存在外部WeakMap对象_name上面，
// 通过this键区分。由于通过proxy.name访问时，this指向proxy，
// 导致无法取到值，所以返回undefined。

// 此外，有些原生对象的内部属性，只有通过正确的this才能拿到，所以 Proxy 也无法代理这些原生对象的属性。
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.
// 上面代码中，getDate方法只能在Date对象实例上面拿到，如果this不是Date对象实例就会报错。
// 这时，this绑定原始对象，就可以解决这个问题。

const target = new Date('2019-07-08');
const handler = {
  get(target, prop){
    if(prop === 'getDate'){
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
}
const p = new Proxy(target, handler);
p.getDate();
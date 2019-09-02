// 定义: set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选

/********************************Example one****************************************/
let validator = {
  set (target, property, value, receiver) {
    if (property  === 'age') {
      if ( !Number.isInteger(value) ){
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }
    target[property] = value;
  }
}
const target = {};
let person = new Proxy(target, validator);

person.age = 100;
person.age //100
person.age = 'young'; //Error
person.age = 300; //Errors

/*******************************第四个参数receiver*****************************************/
const handler = {
  set (target, prop, value, receiver) {
    target[prop] = receiver;
  }
};
const target = {};
const proxy = new Proxy(target, handler);
const obj = {};
Object.setPrototypeOf(obj, proxy);
obj.foo = 'bar';
obj.foo === obj;  // true

/******************************属性不可配置且不可写时,set代码不生效******************************************/
const obj = {};
Object.defineProperty(obj,'foo', {
  value: 'bar',
  writable: false,
})
const handler = {
  set (obj, prop, value, receiver) {
    obj[prop] = 'baz';
  }
}
const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo   // bar
/*******************************严格模式下，不返回true报错*****************************************/
'use strict';
const handler = {
  set (target, prop, value, receiver) {
    target[prop] = receiver;
    // 无论是否有下面这行，都会报错，或返回值为undefined
    return false;
  }
}
const proxy = new Proxy({},handler);
proxy.foo = 'bar';
// Uncaught TypeError: 'set' on proxy: trap returned falsish for property 'foo'
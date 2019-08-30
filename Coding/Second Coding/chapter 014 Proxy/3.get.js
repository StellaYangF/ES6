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

/********************************内部属性不被读写****************************************/
// 工具函数
const invariant = (key, action) => {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
const GET = 'get';
const SET = 'set';
const target = {};

const handler = {
  get (target, key) {
    invariant(key, GET);
    return target[key];
  },
  set (target, key, value) {
    invariant(key, SET);
    target[key] = value;
    return true;
  }
};
const proxy = new Proxy(target, handler);
proxy._prop;
proxy._prop = 'c';
// Error: Invalid attempt to get private "_prop" property


/************************************************************************/
/************************************************************************/
/************************************************************************/
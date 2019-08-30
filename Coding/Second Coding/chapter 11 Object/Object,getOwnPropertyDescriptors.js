// 实现原理
Object.getOwnPropertyDescriptors = obj => {
  const result = {};
  for (let key of Reflect.ownKeys(obj)) {
    result[key] = Reflect.getOwnPropertyDescriptor(obj, key);
  }
  return result;
};
// 例子
const obj = {
  foo: 123,
  get bar() {
    return "abc";
  }
};
console.log(Object.getOwnPropertyDescriptors(obj));

// 该静态方法引入目的：解决Object.assign()合并对象时，无法正确拷贝get属性和set属性的问题！
// assign方法总拷贝一个属性的值，不拷贝背后的赋值方法和取值方法

// Object.getOwnPropetyDescriptors 配合Object.getOwnPropetyDescriptor
const source = {
  set foo(value) {
    console.log(value);
  }
};
const target2 = {};
Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
Object.getOwnPropertyDescriptor(target2, "foo");

// 合并逻辑写成一个函数
const shallowMerge = (target, source) =>
  Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));

const clone = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);

const shallowClone = obj =>
  Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  );

let mix = object => ({
  with: (...mixins) =>
    mixins.reduce((c, mixin) => {
      Object.create(c, Object.getOwnPropertyDescriptors(mixin)), object;
    })
});

// 设置一个对象的原型对象
Object.setPrototypeOf = (obj, proto) => {
  obj.__proto__ = proto;
  return obj;
};

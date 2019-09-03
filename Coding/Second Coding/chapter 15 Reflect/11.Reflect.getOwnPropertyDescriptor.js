// 1) Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象，将来会替代掉后者。

const obj = {};
Reflect.defineProperty(obj, 'hidden', {
  value: true,
  enumerable: false,
})

// before
const theDescriptor = Object.getOwnPropertyDescriptor(obj, 'hidden');
// after
const theDescriptor = Reflect.getOwnPropertyDescriptor(obj, 'hidden');

// Reflect.getOwnPropertyDescriptor和Object.getOwnPropertyDescriptor的一个区别是，如果第一个参数不是对象，Object.getOwnPropertyDescriptor(1, 'foo')不报错，返回undefined，而Reflect.getOwnPropertyDescriptor(1, 'foo')会抛出错误，表示参数非法。


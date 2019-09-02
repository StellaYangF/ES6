// 1) example
const obj = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  }
};

Reflect.get(obj, 'baz');``// 3

// 2) example: 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。
const obj = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  }
};

const obj2 = {
  foo: 4,
  bar: 4,
}
Reflect.get(obj, 'baz',obj2); // 8

// 3) example: 如果第一个参数不是对象，Reflect.get方法会报错。
Reflect.get(1, 'foo');
Reflect.get('tom', 't');
// Uncaught TypeError: Reflect.get called on non-object
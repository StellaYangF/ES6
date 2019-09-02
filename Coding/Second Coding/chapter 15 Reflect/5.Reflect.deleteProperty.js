const obj = { name: "Amy"};
Reflect.deleteProperty(obj, 'name');
// true
Reflect.deleteProperty(obj, 'age');
// true
Reflect.defineProperty(obj, 'score', {
  value: 100,
  configurable: false,
})
Reflect.deleteProperty(obj, 'score')
// false
// 该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；
// 删除失败，被删除的属性依然存在，返回false。
// 如果Reflect.deleteProperty()方法的第一个参数不是对象，会报错。
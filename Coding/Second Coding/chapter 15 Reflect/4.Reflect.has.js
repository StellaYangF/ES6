const obj = { name: "Amy"};
Reflect.has(obj, 'name');
// true
// 如果Reflect.has()方法的第一个参数不是对象，会报错。
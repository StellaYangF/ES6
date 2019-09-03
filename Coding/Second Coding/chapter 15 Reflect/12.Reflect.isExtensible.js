// Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
const obj = {};
// before
Object.isExtensible(obj);   // true
Reflect.isExtensible(obj);  // true

// 如果参数不是对象，Object.isExtensible会返回false，因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错。

Reflect.isExtensible(1);
// Uncaught TypeError: Reflect.isExtensible called on non-object
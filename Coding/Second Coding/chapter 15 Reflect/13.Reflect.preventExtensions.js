  
// Reflect.preventExtensions对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
const obj = {};
Object.preventExtensions(obj);    // Object {}
Reflect.preventExtensions(obj);   // true

// 如果参数不是对象，Object.preventExtensions在 ES5 环境报错，在 ES6 环境返回传入的参数，而Reflect.preventExtensions会报错。
Object.preventExtensions(1);    // ES5 : Error  ES6 : 1
Reflect.preventExtensions(1);   // 
// Uncaught TypeError: Reflect.preventExtensions called on non-object
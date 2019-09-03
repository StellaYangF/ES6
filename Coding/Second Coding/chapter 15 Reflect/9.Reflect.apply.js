// 1) 一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，采用Reflect对象可以简化这种操作。
const ages = [ 11, 33, 12, 54, 18, 96];
// before
let youngest = Math.min.apply(Math,ages);
let oldest = Math.max.apply(Math, ages);
let type = Object.prototype.toString.call(youngest);

// now
youngest = Reflect.apply(Math.min, Math, ages);
oldest = Reflect.apply(Math.max, Math, ages);
type = Reflect.apply(Object.prototype.toString, youngest, []);
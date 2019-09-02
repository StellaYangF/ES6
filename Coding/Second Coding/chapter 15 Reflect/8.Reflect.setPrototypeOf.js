// Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），
// 对应Object.setPrototypeOf(obj, newProto)方法。
// 它返回一个布尔值，表示是否设置成功。
const obj = {};
Reflect.setPrototypeOf(obj, Array.prototype);
obj.length // 0
/****************************拦截Object.defineProperty********************************************/
const handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
}
const target = {};
const p = new Proxy(target, handler);

p.foo = 'bar';  // no effect



/******************************目标对象不可拓展，则该方法不能添加目标对象不存在的属性，否则报错******************************************/
const target = { name: 'lily'};
Object.preventExtensions(target);
const handler = {
  defineProperty (target, key, descriptor) {
    return true;
  }
}
const p = new Proxy(target, handler);
p.age = 'tom';
// Uncaught TypeError: 'defineProperty' on proxy: 
// trap returned truish for adding property 'age'  
// to the non-extensible proxy target


/******************************目标对象某属性不可写或不可配置，则该方法不得改变两个设置******************************************/
const target = { name: 'lily'};
Object.defineProperty(target, 'age', {
  value: 20,
  writable: false,
  enumerable: true,
  configurable: true
})
const handler = {
  defineProperty (target, key, descriptor) {
    return true;
  }
}
const p = new Proxy(target, handler);
p.age = 28; //no effect

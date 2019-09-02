// 1) example 1
const p = new Proxy({}, {
  isExtensible (target) {
    console.log('called');
    return true;
  }
})
Object.isExtensible(p);
// 'called' true

// 2） Note： 返回值只能是布尔值，否则被自动转boolean
const p = new Proxy({}, {
  isExtensible (target) {
    console.log('called');
    return 'OK';
  }
})
Object.isExtensible(p);
// 'called' true

// 3) 强限制： 返回值必须与目标对象isExtensible属性一直，否则抛出错误
Object.isExtensible(proxy) === Object.isExtensible(target);

const p = new Proxy({}, {
  isExtensible (target) {
    return false;
  }
})
Object.isExtensible(p);
//Uncaught TypeError: 'isExtensible' on proxy: 
// trap result does not reflect extensibility of proxy target (which is 'true')
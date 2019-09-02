// 1） example 1: 
const p = new Proxy({}, {
  preventExtensions (target) {
    return true;
  }
})
Object.preventExtensions(p);
// Uncaught TypeError: 'preventExtensions' on proxy: 
// trap returned truish but the proxy target is extensible

// solution
const p = new Proxy({}, {
  preventExtensions (target) {
    console.log('called');
    Reflect.preventExtensions(target);
    return true;
  }
})
Object.preventExtensions(p);
// "called"
// Proxy {}
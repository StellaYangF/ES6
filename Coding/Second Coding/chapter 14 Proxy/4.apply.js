/***************************Params*********************************************/
// example1: 
const handler = {
  apply (target, ctx, args)  {
    return Reflect.apply(...arguments);
  }
}

// exmpale2 :
const target = () => 'I am the target';
const handler = {
  apply () {
    return 'I am the proxy';
  }
}
const p = new Proxy(target, handler);
p();    // I am the proxy;

// exmample3:
const twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum (left, right) {
  return left  + right;
};
const proxy = new Proxy(sum, twice);
proxy(1,2);   // 6
proxy.call(null, 2, 3);  // 10
proxy.apply(null, [ 3, 4 ]); // 14
Reflect.apply(proxy, null, [ 5, 6 ]); // 22
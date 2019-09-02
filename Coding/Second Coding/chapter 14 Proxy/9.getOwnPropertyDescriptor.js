// 1) example 1
const handler = {
  getOwnPropertyDescriptor (target, key) {
    if (key[0] === '_') {
      return ;
    }
    return Object.getOwnPropertyDescriptor(target, key);
  }
}
const target = { _foo: "foo", baz: "baz" };
const p = new Proxy(target, handler);
Object.getOwnPropertyDescriptor(p, "_foo"); // undefined
Object.getOwnPropertyDescriptor(p, "wat");  // undefined
Object.getOwnPropertyDescriptor(p, "baz");  // {value: "baz", writable: true, enumerable: true, configurable: true}
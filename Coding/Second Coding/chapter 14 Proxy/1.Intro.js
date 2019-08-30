let obj = new Proxy({}, {
  get (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },

  set (target, key, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, receiver);
  }
})                                                                                                                      
obj.count = 1;
++obj.count

let proxy = new Proxy({}, {
  get (target, property)  {
    return 35;
  }
})

let obj = Object.create(proxy);

obj.time   // 35


// 拦截器函数
let handler = {
  get (target, name)  {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },

  apply (target, thisBingding, args) {
    return args[0];
  },

  construct (target, args) {
    return { value: args[1]};
  }
}

// 此处不用箭头函数做target对象，箭头函数不能做构造函数
let fproxy = new Proxy( function(x,y){
  return x + y;
}, handler);

console.log(fproxy(1,2)); //1
// invoke handler.apply()
console.log(new fproxy(1,2));  // {value: 2};
// invoke handler.construct()
console.log(fproxy.property === Object.prototype);  // true
console.log(fproxy.hello = 'Hello, hello'); // Hello, hello
// invoke handler.get()


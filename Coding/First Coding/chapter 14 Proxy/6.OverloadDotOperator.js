const obj = new Proxy({}, {
  get (target, key, receiver) { 
    console.log(`getting start`)
    console.log(receiver.count);
    // Proxy { count: 1 }
    return Reflect.get(target, key, receiver);
  },
  set (target, key, value, receiver) {
    console.log('setting start');
    return Reflect.set(target, key, value, receiver);
  }
})

obj.count = 1;
++obj.count;

// let proxy = new Proxy(target, handler);
function MyDate () {
  /*...*/ 
};
// before
Object.defineProperty(MyDate, 'now', { value: () => Date.now()});
// now
Reflect.defineProperty(MyDate, 'now', { value: () => Date.now()});

// 2) 配合proxy.defineProperty使用
const p = new Proxy({}, {
  defineProperty (target, prop, descriptor) {
    console.log(descriptor);
    return Reflect.defineProperty(target,prop, descriptor) ;
  }
})
p.foo = 'bar';
// {value: "bar", writable: true, enumerable: true, configurable: true}
p.foo ;; 
//'bar'

// 上面代码中，Proxy.defineProperty对属性赋值设置了拦截，然后使用Reflect.defineProperty完成了赋值。


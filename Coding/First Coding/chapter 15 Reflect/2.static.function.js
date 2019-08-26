// Reflect对象一共有 13 个静态方法。

/* 
  Reflect.apply(target, thisArg, args)
  Reflect.construct(target, args)
  Reflect.get(target, name, receiver)
  Reflect.set(target, name, value, receiver)
  Reflect.defineProperty(target, name, desc)
  Reflect.deleteProperty(target, name)
  Reflect.has(target, name)
  Reflect.ownKeys(target)
  Reflect.isExtensible(target)
  Reflect.preventExtensions(target)
  Reflect.getOwnPropertyDescriptor(target, name)
  Reflect.getPrototypeOf(target)
  Reflect.setPrototypeOf(target, prototype)  
*/

// (1) Reflect.get(target, name, receiver)
// Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
let myObj = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  }
};
Reflect.get(myObj, "foo");

// 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。
let o = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  }
};
let o1 = {
  foo: 4,
  bar: 4
};

Reflect.get(o, "baz", o1); // 8

// 如果第一个参数不是对象，Reflect.get方法会报错。
Reflect.get(1, "foo"); //Error
Reflect.get(false, "foo"); //Error


// (2) Reflect.set(target, name, value, receiver)
// Reflect.set方法设置target对象的name属性等于value。
let o = {
  foo: 1,
  set bar(value) {
    return (this.foo = value);
  }
};

o.foo; //1
Reflect.set(o, "foo", 2);
o.foo; //2

// 如果name属性设置了赋值函数，则赋值函数的this绑定receiver。
let o = {
  foo: 4,
  set bar(value) {
    return (this.foo = value);
  }
};

let o1 = {
  foo: 0
};
Reflect.set(o, "bar", 1, o1);
o.foo; //4
o1.foo; //1

// 注意，如果 Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，
// 后者完成赋值的默认行为，而且传入了receiver，
// 那么Reflect.set会触发Proxy.defineProperty拦截。
let p = { a: "a" };
let handler = {
  set(target, key, value, receiver) {
    console.log("set");
    Reflect.set(target, key, value, receiver);
  },
  defineProperty(target, key, attribute) {
    console.log("defineProperty");
    Reflect.defineProperty(target, key, attribute);
  }
};
let o = new Proxy(p, handler);
o.a = "A";


// (3) Reflect.has(obj, name)
// Reflect.has方法对应name in obj里面的in运算符。
let o = {
  foo: 1
};

"foo" in o;
Reflect.has(o, "foo");


// (4) Reflect.deleteProperty(obj, name)
// Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。
let o = {
  foo: "bar"
};
delete o.foo;
Reflect.deleteProperty(o, "foo");
// 该方法返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回true；
// 删除失败，被删除的属性依然存在，返回false。
// 如果Reflect.deleteProperty()方法的第一个参数不是对象，会报错。


// (5) Reflect.construct(target, args)
// Reflect.construct方法等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
function Greeting(name) {
  this.name = name;
}

let instance = new Greeting("tom");
let instance1 = Reflect.construct(Greeting, ["linda"]);


// (6) Reflect.getPrototypeOf(obj)
let o = new Greeting("Eva");
Object.getPrototypeOf(o) === Greeting.prototype; // true
Reflect.getPrototypeOf(o) === Greeting.prototype; // true

// Reflect.getPrototypeOf和Object.getPrototypeOf的一个区别是，
// 如果参数不是对象，Object.getPrototypeOf会将这个参数转为对象，
// 然后再运行，而Reflect.getPrototypeOf会报错。
Object.getPrototypeOf(1); // Number {[[PrimitiveValue]]: 0}
Reflect.getPrototypeOf(1); // 报错
// Uncaught TypeError: Reflect.getPrototypeOf called on non-object.


// (7) Reflect.setPrototypeOf(obj, newProto)
// Reflect.setPrototypeOf方法用于设置目标对象的原型（prototype），
// 对应Object.setPrototypeOf(obj, newProto)方法。
// 它返回一个布尔值，表示是否设置成功。
let obj = {};
Object.setPrototypeOf(obj, Array.prototype);

Reflect.setPrototypeOf(obj, Array.prototype);
// 如果无法设置目标对象的原型（比如，目标对象禁止扩展），
// Reflect.setPrototypeOf方法返回false。
Reflect.setPrototypeOf({}, null);
// 等同于
Object.create(null); //  true
Reflect.setPrototypeOf(Object.freeze({}), null); // false

// 如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，
// 而Reflect.setPrototypeOf会报错。
Object.setPrototypeOf(1, null); // 1
Reflect.setPrototypeOf(1, null); // Error
// Uncaught TypeError: Reflect.setPrototypeOf called on non-object

// 如果第一个参数是undefined或null，Object.setPrototypeOf和Reflect.setPrototypeOf都会报错。
Object.setPrototypeOf(null, {}); // Error
Reflect.setPrototypeOf(undefined, {}); // Error


// (8) Reflect.apply(func, thisArg, args)
// Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，
// 用于绑定this对象后执行给定函数。

// 一般来说，如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，
// 但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)，
// 采用Reflect对象可以简化这种操作。


// (9) Reflect.defineProperty(target, propertyKey, attributes)
// Reflect.defineProperty方法基本等同于Object.defineProperty，用来为对象定义属性。
// 未来，后者会被逐渐废除，请从现在开始就使用Reflect.defineProperty代替它。
function MyDate(){
  this.name = "tom";
  this.anniversary = "9.1";
}
Object.defineProperty(MyDate, 'now', {
  value: ()=> Date.now()
})
Reflect.defineProperty(MyDate, "now", {
  value: ()=> Date.now()
})
// 如果Reflect.defineProperty的第一个参数不是对象，就会抛出错误，
// 比如Reflect.defineProperty(1, 'foo')。
// 这个方法可以与Proxy.defineProperty配合使用。
let p = new Proxy({},{
  defineProperty(target, prop, descriptor){
    console.log(descriptor);
    return Reflect.defineProperty(target, prop, descriptor);
  }
})

p.foo = "bar";
p.foo //"bar"




// (10) Reflect.getOwnPropertyDescriptor(target, propetyKey)
// Reflect.getOwnPropertyDescriptor基本等同于Object.getOwnPropertyDescriptor，
// 用于得到指定【属性的描述对象】，将来会替代掉后者。
let o = {};
Object.defineProperty(o, "hidden", {
  value: false,
  enumerable: false,
});
// old
Object.getOwnPropertyDescriptor(o, "hidden");
// new
Reflect.getOwnPropertyDescriptor(o, "hidden");


// (11) Reflect.isExtensible (target)
// Reflect.isExtensible方法对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
let o = {};
Object.isExtensible(o); // true
Reflect.isExtensible(o); // true

// 如果参数不是对象，Object.isExtensible会返回false，
// 因为非对象本来就是不可扩展的，而Reflect.isExtensible会报错。
Object.isExtensible(1); // false
Reflect.isExtensible(1); // Error


// (12) Reflect.preventExtensions(target)
// Reflect.preventExtensions对应Object.preventExtensions方法，
// 用于让一个对象变为不可扩展。
// 它返回一个布尔值，表示是否操作成功。
let o = {};
Object.preventExtensions(o); // 返回对象Object {}
Reflect.preventExtensions(o); // true
// 如果参数不是对象，Object.preventExtensions在 ES5 环境报错，在 ES6 环境返回传入的参数，
// 而Reflect.preventExtensions会报错。
// ES 5
Object.preventExtensions(1); //Error
// ES 6   1
Reflect.preventExtensions(1);
// Uncaught TypeError: Reflect.preventExtensions called on non-object


// (13) Reflect.ownKeys(target)
// Reflect.ownKeys方法用于返回对象的所有属性，基本
// 等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
let o = {
  foo: 1,
  bar: 2,
  [Symbol.for("baz")]: 3,
  [Symbol.for("bing")]: 4
};

// old method
Object.getOwnPropertyNames(o); // == Object.keys(0);
Object.getOwnPropertySymbols(o);

// new method
Reflect.ownKeys(o);

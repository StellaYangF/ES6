// 下面是上面这些拦截方法的详细介绍。

// 1: get()
// get方法用于拦截某个属性的读取操作，可以接受三个参数，
// 依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。
person = {
  name: "Tom"
};
proxy = new Proxy(person, {
  get(target, prop, receiver) {
    if (prop in target) {
      return target[prop];
    } else {
      throw new ReferenceError(`Property "${prop}" does not exsist.`);
    }
  }
});
// 上面代码表示，如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性，只会返回undefined。

// get方法可以继承。
proxy = new Proxy(
  {},
  {
    get(target, prop, receiver) {
      console.log("GET " + prop);
      return target[prop];
    }
  }
);
obj = Object.create(proxy);
obj.foo // "GET foo"
// 上面代码中，拦截操作定义在Prototype对象上面，所以如果读取obj对象继承的属性时，拦截会生效。


// 下面的例子使用get拦截，实现数组读取负数的索引。
function createArray(...elements){
  let handler = {
    get(target, prop,receiver){
      let index = Number(prop);
      if(index < 1){
        prop = String(target.length + index);
      }
      return Reflect.get(target, prop, receiver);
    }
  };
  let target = [...elements];
  return new Proxy(target, handler);
}
arr = createArray('a', 'b', 'x');
arr[-1];


// 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。
let pipe = (function () {
  return function (value){
    let funcStack = [];
    let oproxy = new Proxy({},{
      get : function(pipeObject, fnName){
        if(fnName === "get"){
          return funcStack.reduce(function(val, fn){
            return fn(val);
          }, value)
        }
        funcStack.push(window[fnName]);
        return oproxy;
      }
    });
    return oproxy;
  }
}())

double = n => n * 2;
pow = n => n * n;
reverseInt = n=> n.toString().split("").reverse().join("") | 0;
pipe(3).double.pow.reverseInt.get;
/***************** something wrong happen here *****************/ 

// 下面的例子则是利用get拦截，实现一个生成各种 DOM 节点的通用函数dom。
dom = new Proxy({}, {
  get(target, property){
    return function (attrs = {}, ...children){
      const el = document.createElement(property);
      for(let prop of Object.keys(attrs)){
        el.setAttribute(prop, attrs[prop]);
      }
      for(let child of children){
        if (typeof child === "string"){
            child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
})

const el = dom.div({},
  "Hello, my name is ",
  dom.a({
    href: 'http://baidu.com',
    style: 'margin-left: 30px'
  }, 'Mark'),
  '. I like:',
  dom.ul({
    "list-style": "disc",
    style: 'color: #ffbb99'
  },
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '...actually that\' it')
  )
)
document.body.appendChild(el);


// Example 3:
// 下面是一个get方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。
const proxy = new Proxy({},{
  get(target, property, receiver){
    return receiver;
  }
})
proxy.getReceiver === proxy;    //true
const d = proxy.create(proxy);
d.a === d //true
// 上面代码中，d对象本身没有a属性，所以读取d.a的时候，会去d的原型proxy对象找。
// 这时，receiver就指向d，代表原始的读操作所在的那个对象。



// Example 4: 
// 如果一个属性不可配置（configurable）且不可写（writable），
// 则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。
const target = Object.defineProperties({},{
  foo: {
    value: 123,
    writable: false,
    configurable: false
  }
})

const handler = {
  get(target, propKey){
    return "abc";
  }
}
const proxy = new Proxy(target, handler);
proxy.foo   
// Uncaught TypeError: 'get' on proxy: property 'foo' is a read-only and 
// non-configurable data property on the proxy target 
// but the proxy did not return its actual value (expected '123' but got 'abc')
proxy.time  //"abc"

// 2: set()
// set方法用来拦截某个属性的赋值操作，可以接受四个参数，
// 依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

// 2.1 example
// 假定Person对象有一个age属性，该属性应该是一个不大于 200 的整数，
// 那么可以使用Proxy保证age的属性值符合要求。
let validator = {
  set(obj, propKey, propValue){
    if(propKey === "age"){
      if (!Number.isInteger(propValue)) throw new TypeError('The age is not an integer');
    }
    if(propValue > 200) throw new RangeError('The age seems invalid');
    obj[propKey] = propValue;
  }
}
let person = new Proxy({},validator);
// 上面代码中，由于设置了存值函数set，任何不符合要求的age属性赋值，
// 都会抛出一个错误，这是数据验证的一种实现方法。
// 利用set方法，还可以数据绑定，即每当对象发生变化时，会自动更新 DOM。

// 2.2 example
// 有时，我们会在对象上面设置内部属性，属性名的第一个字符使用下划线开头，
// 表示这些属性不应该被外部使用。结合get和set方法，就可以做到防止这些内部属性被外部读写。
const handler = {
  get(target, key){
    invariant(key, 'get');
    return target[key];
  },
  set(target, key, value){
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};
function invariant(key, action){
  if (key[0] === '_'){
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}
const target = {};
const proxy = new Proxy(target, handler);
proxy._prop
// Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c';
// Error: Invalid attempt to set private "_prop" property

// 上面代码中，只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。

// 2.3 example
// 下面是set方法第四个参数的例子。
const handler = {
  set(obj, key,  value, receiver){
    obj[key] = receiver;
  }
}
const proxy = new Proxy({}, handler);
proxy.foo = 'bar';
proxy.foo === proxy //true

// 上面代码中，set方法的第四个参数receiver，指的是原始的操作行为所在的那个对象，
// 一般情况下是proxy实例本身，请看下面的例子。
const handler = {
  set(obj, prop, value, receiver){
    obj[prop] = receiver;
  }
}
const proxy = new Proxy({}, handler);
const myObj = {};
Object.setPrototypeOf(myObj, proxy);
myObj.foo ='bar'
myObj.foo === myObj;    //True
// 上面代码中，设置myObj.foo属性的值时，myObj并没有foo属性，因此引擎会到myObj的原型链去找foo属性。
// myObj的原型对象proxy是一个 Proxy 实例，设置它的foo属性会触发set方法。
// 这时，第四个参数receiver就指向原始赋值行为所在的对象myObj。

// 2.4 example
// 注意，如果目标对象自身的某个属性，不可写且不可配置，那么set方法将不起作用。
const obj = {};
Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false,
})

const handler = {
  set(obj, prop, value, receiver){
    obj[prop] = 'baz';
  }
}
const proxy = new Proxy(obj, handler);
proxy.foo = 'baz';
proxy.foo // 'bar'
// 上面代码中，obj.foo属性不可写，Proxy 对这个属性的set代理将不会生效。

// 注意，严格模式下，set代理如果没有返回true，就会报错。
'use strict';
const handler = {
  set(obj, prop, value, receiver){
    obj[prop] = receiver;
    return false;
  }
}
const proxy = new Proxy({}, handler);
proxy.foo ='bar';
// TypeError: 'set' on proxy: trap returned falsish for property 'foo'


// 3: apply()
// apply方法拦截函数的调用、call和apply操作。
// apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。
let handler = {
  apply(target, ctx, args){
    return Reflect.apply(...args);
  }
}

// 3.1 : example
let target = ()=> 'I\'m the target';
let handler = {
  apply(){
    return 'I\'m the proxy';
  }
}

let p = new Proxy(target, handler);
p();    // "I'm the proxy"
// 上面代码中，变量p是 Proxy 的实例，当它作为函数调用时（p()），就会被apply方法拦截，返回一个字符串。

// 3.2 : example
let twice = {
  apply (target, ctx, args) {
    return Reflect.apply(...arguments) * 2;
  }
};
function sum(left, right){
  return left + right;
};
let proxy = new Proxy(sum, twice);
proxy(1,2); //6
proxy.call(null, 5, 6) //22
proxy.apply(null, [7,8])  //30
// 另外，直接调用Reflect.apply方法，也会被拦截。
Reflect.apply(proxy, null, [9, 10])//38
// 上面代码中，每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截。

// 4: has()
// has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。
// 典型的操作就是in运算符。
// has方法可以接受两个参数，分别是目标对象、需查询的属性名。

// 下面的例子使用has方法隐藏某些属性，不被in运算符发现。
let handler = {
  has (target, prop){
    if(prop[0] === "_") return false;
    return prop in target;
  }
}
let target = {_prop:'foo', prop: 'foo'};
let proxy = new Proxy(target, handler);
// 上面代码中，如果原对象的属性名的第一个字符是下划线，
// proxy.has就会返回false，从而不会被in运算符发现。

// 如果原对象不可配置或者禁止扩展，这时has拦截会报错。
let obj = {a: 10};
Object.preventExtensions(obj);
let p = new Proxy(obj, {
  has(target, prop){
    return false;
  }
})
"a" in p;
// Uncaught TypeError: 'has' on proxy: trap returned falsish for property 'a'
// but the proxy target is not extensible.
// 上面代码中，obj对象禁止扩展，结果使用has拦截就会报错。
// 也就是说，如果某个属性不可配置（或者目标对象不可扩展），
// 则has方法就不得“隐藏”（即返回false）目标对象的该属性。

let stu1 = {name: '张三', score: 59};
let stu2 = {name: '李四', score: 99};

let handler = {
  has(target, prop){
    if(prop ==="score" && target[prop] < 60){
      console.log(`${target.name} 不及格`);
      return false;
    }
    return prop in target;
  }
}
let oproxy1 = new Proxy(stu1, handler);
let oproxy2 = new Proxy(stu2, handler);
"score" in  oproxy1;      
"score" in  oproxy2;
// 张三 不及格
// false

for(let a in oproxy1) console.log(oproxy1[a]);
for(let b in oproxy2) console.log(oproxy2[b]);
// 上面代码中，has拦截只对in运算符生效，对for...in循环不生效，导致不符合要求的属性没有被for...in循环所排除。


// 5: construct()
// construct方法用于拦截new命令，下面是拦截对象的写法。
let handle = {
  construct( target, args, newTarget){
    return new target(...args);
  }
}

// 5.1 : example
let p = new Proxy(function(){},{
  construct(target, args){
    console.log('called: '+args.join(", "));
    return {value: args[0] * 10};
  }
})

(new p(1)).value;

// construct方法返回的必须是一个对象，否则报错
let p = new Proxy(function(){},{
  construct(target, argumentsList){
    return 1;
  }
})
new p();
// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')

// 6: deleteProperty()
// deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，
// 当前属性就无法被delete命令删除。
let handler = {
  deleteProperty(target, key){
    invariant(key, 'delete');
    delete target[key];
    return true;
  }
}
function invariant(key, action){
  if(key[0]==='_') throw new Error(`Invalid attempt to ${action} private "${key}" property`);
}
let target = {_prop: 'foo'};
let proxy = new Proxy(target, handler);
delete proxy._prop
// Error: Invalid attempt to delete private "_prop" property
// 上面代码中，deleteProperty方法拦截了delete操作符，删除第一个字符为下划线的属性会报错。

// 注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。


// 7: defineProperty()
// defineProperty方法拦截了Object.defineProperty操作。
let handler = {
  defineProperty(target, key, descriptor){
    return false;
  }
}
let target = {};
let proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效

// 上面代码中，defineProperty方法返回false，导致添加新属性总是无效。

// 注意，如果目标对象不可扩展（non-extensible），
// 则defineProperty不能增加目标对象上不存在的属性，否则会报错。
// 另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty方法不得改变这两个设置。

let handler = {
  defineProperty(target, key, descriptor){
    return false;
  }
}
let target = {};
Object.preventExtensions(target);
let proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效

// 8: getOwnPropertyDescriptor()
// getOwnPropertyDescriptor方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。
let handler = {
  getOwnPropertyDescriptor (target, key){
    if(key[0] === "_") return;
    return Object.getOwnPropertyDescriptor(target, key);
  }
}

let target = {_foo: "bar", baz: 'tar'};
let proxy = new Proxy(target, handler)
Object.getOwnPropertyDescriptor(proxy, 'wat')
// undefined
Object.getOwnPropertyDescriptor(proxy, '_foo')
// undefined
Object.getOwnPropertyDescriptor(proxy, 'baz')
// { value: 'tar', writable: true, enumerable: true, configurable: true }
// 上面代码中，handler.getOwnPropertyDescriptor方法对于第一个字符为下划线的属性名会返回undefined。

// 9 : getPropertyOf()
// getPrototypeOf方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。
/*  
  Object.prototype.__proto__
  Object.prototype.isPrototypeOf()
  Object.getPrototypeOf()
  Reflect.getPrototypeOf()
  instanceof
*/
// 9.1 example
let  proto ={};
let p = new Proxy({}, {
  getPrototypeOf(target){
    return proto;
  }
})
Object.getPrototypeOf(p) === proto;   // true
// 上面代码中，getPrototypeOf方法拦截Object.getPrototypeOf()，返回proto对象。
// 注意，getPrototypeOf方法的返回值必须是对象或者null，否则报错。
// 另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf方法必须返回目标对象的原型对象。


// 10: isExtensible()
// isExtensible方法拦截Object.isExtensible操作。
let p = new Proxy({}, {
  isExtensible(target){
    console.log('called');
    return true;
  }
})
Object.getPrototypeOf(p);
// "called"
// true

// 上面代码设置了isExtensible方法，在调用Object.isExtensible时会输出called。
// 注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值。
// 这个方法有一个强限制，它的返回值必须与目标对象的isExtensible属性保持一致，否则就会抛出错误。

Object.isExtensible(proxy) === Object.isExtensible(target);

// 10.1: example
let p = new Proxy({}, {
  isExtensible(taret){
    return false;
  }
})

Object.isExtensible(p);
// Uncaught TypeError: 'isExtensible' on proxy: trap result does not 
// reflect extensibility of proxy target (which is 'true')

// 11 : ownKeys()
// ownKeys方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。
/* 
  Object.getOwnPropertyNames()
  Object.getOwnPropertySymbols()
  Object.keys()
  for...in循环
*/ 
// 11.1 example
let target = {
  a:1, b: 2, c: 4
}
let handler = {
  ownKeys(target){
    return ['a'];
  }
}
let p = new Proxy(target, handler);
Object.keys(p);
// ['a'];

// 11:2 example
let target = {_bar: 'foo', _prop: 'bar', prop: 'baz'};
let handler = {
  ownKeys(target){
    return Reflect.ownKeys(target).filter(key => key[0] !== '_');
  }
}
let p = new Proxy(target, handler);
for(let key of Object.keys(p)){
  console.log(target[key]);
}
// 注意，使用Object.keys方法时，有三类属性会被ownKeys方法自动过滤，不会返回。
/*
  目标对象上不存在的属性
  属性名为 Symbol 值
  不可遍历（enumerable）的属性
*/ 
let target = {
  a: 1, b: 2, c: 3, [Symbol.for('secret')]:'4',
}
Object.defineProperty(target, 'key', {
  enumerable: false,
  configurable: true,
  writable: true,
  value: 'static'
})
let handler = {
  ownKeys(target){
    return ["a", "d", Symbol.for('secret'), 'key'];
  }
}
let proxy = new Proxy(target, handler);
Object.keys(proxy);
// 上面代码中，ownKeys方法之中，显式返回不存在的属性（d）、Symbol 值（Symbol.for('secret')）、
// 不可遍历的属性（key），结果都被自动过滤掉。

// ownKeys方法还可以拦截Object.getOwnPropertyNames()。
let p = new Proxy({}, {
  ownKeys(target){
    return ['a', 'b', 'c'];
  }
})

Object.getOwnPropertyNames(p);
// [ 'a', 'b', 'c' ]

// for...in循环也受到ownKeys方法的拦截。
const obj = {hello: 'world'};
const p = new Proxy(obj, {
  ownKeys(target){
    return ['a', 'b', 'c'];
  }
})
for(let key in p){
  console.log(key);   // 没有任何输出
}
// 上面代码中，ownkeys指定只返回a和b属性，由于obj没有这两个属性，因此for...in循环不会有任何输出。

// ownKeys方法返回的数组成员，只能是【字符串】或 【Symbol 值】。
// 如果有其他类型的值，或者返回的根本不是数组，就会报错。
let obj = {};
let  p = new Proxy(obj, {
  ownKeys(target){
    return [123, true, undefined, null, {}, []];
  }
});
Object.getOwnPropertyNames(p);
// Uncaught TypeError: 123 is not a valid property name
// 上面代码中，ownKeys方法虽然返回一个数组，但是每一个数组成员都不是字符串或 Symbol 值，因此就报错了。


// 如果目标对象自身包含不可配置的属性，则该属性必须被ownKeys方法返回，否则报错。
let obj = {};
Object.defineProperties(obj, {
  a: {
    configurable: false,
    enumerable: true,
    value: 10
  }
})
let p =new Proxy(obj, {
  ownKeys(target){
    return ['b'];
  }
})

Object.getOwnPropertyNames(p);
// Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'
// 上面代码中，obj对象的a属性是不可配置的，这时ownKeys方法返回的数组之中，必须包含a，否则会报错。


// 另外，如果目标对象是不可扩展的（non-extensible），这时ownKeys方法返回的数组之中，
// 必须包含原对象的【所有属性】，且【不能包含多余的属性】，否则报错。
let obj = {a: 1};
Object.preventExtensions(obj);
let p = new Proxy(obj, {
  ownKeys(target){
    return ['a', 'b']
  }
})
Object.getOwnPropertyNames(p);
// Uncaught TypeError: 'ownKeys' on proxy: trap returned extra keys but proxy target is non-extensible
// 上面代码中，obj对象是不可扩展的，这时ownKeys方法返回的数组之中，包含了obj对象的多余属性b，所以导致了报错。


// 12: preventExtension()
// preventExtensions方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值。
// 这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false），
// proxy.preventExtensions才能返回true，否则会报错。
let p = new Proxy({}, {
  preventExtensions(target){
    return true;
  }
})
Object.preventExtensions(p);
// 上面代码中，proxy.preventExtensions方法返回true，
// 但这时Object.isExtensible(proxy)会返回true，因此报错。

// 为了防止出现这个问题，通常要在proxy.preventExtensions方法里面，调用一次Object.preventExtensions。
let p = new Proxy({}, {
  preventExtensions(target){
    console.log('called');
    Object.preventExtensions(target);
    return true;
  }
})

Object.preventExtensions(p);
// "called"
// Proxy {}

// 13: setPrototypeOf()
// setPrototypeOf方法主要用来拦截Object.setPrototypeOf方法。
let hanlder = {
  setPrototypeOf(target, proto){
    throw new Error('Changing the prototype is forbidden');
  }
}

let  proto = {};
let target = function(){};
let p = new Proxy(target, hanlder);
Object.setPrototypeOf(p, proto);
// Error: Changing the prototype is forbidden
// 上面代码中，只要修改target的原型对象，就会报错。
// 注意，该方法只能返回布尔值，否则会被自动转为布尔值。
// 另外，如果目标对象不可扩展（non-extensible），setPrototypeOf方法不得改变目标对象的原型。


// 1. Instance method one: .get(target, property, receiver)
// receiver：proxy实例本身

let person = {
  name: 'Tom',
};

let proxy = new Proxy(person, {
  get (target, property) {
    if( property in target)  return target[property]
    else throw new ReferenceError(`Propery "${property}" does not exist.`)
  }
})

console.log(proxy.name) // Tom
console.log(proxy.age) // Error

// get实现继承
let proto = new Proxy({}, {
  get (target, property, receiver) {
    console.log(`GET ${property}`);
    return target[property] && undefined;
  }
});

let obj = Object.create(proto);
console.log(obj.name);
// GET name
// undefined


// 实现数组读取负数
function createArray (...elements) {
  let handler = {
    get (target, property, receiver) {
      let index = Number(property);
      property =  index < 0 ? String(target.length + index): index;
      return Reflect.get(target, property, receiver);
    }
  };

  let target = [...elements];
  return new Proxy(target, handler);
}

let arr = createArray('a', 'b', 'c');
console.log(arr[-1], arr[1]);

/***************** property chain operate *******************/ 
// Cannot use let decleration
var double = n => n * 2;
var pow = n => n* n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

let pipe = (() => {
  return value => {
    const GET = "get";
    let funcStack = [];
    let oproxy = new Proxy({}, {
      // overwrite . method
      get (pipeObject, fnName) {
        if (fnName === GET) {
          return funcStack.reduce((val, fn)=> fn(val), value);
        }
        funcStack.push(window[fnName]);
        return oproxy;
      }
    });
    return oproxy;
  }
})();

let result = pipe(2).double.pow.reverseInt.get; //63

/*****************************simplify*************************************/
// Cannot use let decleration
var double = n => n * 2;
var pow = n => n* n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

let pipe = (()=>{
  return value => {
    const GET = 'get';
    let funcStack = [];
    let target = {};
    let handler = {
      get (target, fnName, receiver) {
        if (fnName === GET) {
          return funcStack.reduce((value, fn) => fn(value), value);
        }
        funcStack.push(window[fnName]);
        return receiver;
      }
    };
    let proxy = new Proxy(target,handler);
    return proxy;
  }
})();

pipe(5).pow.double.reverseInt.get;  // 5

/*******************************get拦截*****************************************/
let target = {};
let handler = {
  get (target , property, receiver) {
    return ( attrs = {}, ...children ) => {
      const el = document.createElement(property);
      Object.keys(attrs).map(prop => {
        el.setAttribute(prop, attrs[prop]);
      });
      children.map(child => {
        child = typeof child === 'string' &&  document.createTextNode(child);
        el.appendChild(child);
      })

      return el;
    }
  }
};
const dom = new Proxy(target, handler);
const el = dom.div({},'hello');

/*******************************若属性不可配置且不可写, proxy不可改变属性，否则报错*****************************************/
const target = Object.defineProperty({}, 'foo', {
  value: 123,
  writable: false,
  configurable: false,
})

const handler = {
  get (target, property) {
    return 'abc';
  }
}
const proxy = new Proxy(target, handler);
proxy.foo;
// Uncaught TypeError: 'get' on proxy: 
// property 'foo' is a read-only and non-configurable data property 
// on the proxy target but the proxy did not return its actual value 
// (expected '123' but got 'abc')

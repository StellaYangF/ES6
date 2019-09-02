/******************************example 1******************************************/
const handler = {
  has (target, property) {
    if (property[0]=== '_') return false;
    return property in target;
  }
}
const target = {_prop: "foo", prop: "foo"};
const proxy = new Proxy(target, handler);
Reflect.has(proxy, '_prop');    // false
'_prop' in proxy;   // false
Reflect.has(proxy, 'prop');   //  true

/***********************************原对象不可配置或禁止扩展，has拦截报错*************************************/
const obj = { a: 10 };
Object.preventExtensions(obj);
const p = new Proxy(obj, {
  has (target, prop) { 
    return false;
  }
});
"a" in p;
// Uncaught TypeError: 'has' on proxy: trap returned falsish for property 'a' but the proxy target is not extensible

/*********************************has拦截的是HasProperty而非HasOwnProperty***************************************/
"constructor" in p;   // false


/*********************************** has拦截对for...in循环不生效 *************************************/
let stu1 = { name: "Lily", score: 59 };
let stu2 = { name: "Eva", score : 99 };
let handler = {
  has (target, prop) {
    if (prop === 'score' && target[prop] < 60) {
      console.log(`${target.name} failed`);
      return false;
    }
    return prop in target;
  }
}
let p1 = new Proxy(stu1, handler);
let p2 = new Proxy(stu2, handler);
'score' in p1;    // Lily failed false
'score' in p2;    // true

for (let a in p1) {
  console.log(p1[a]);
}
// Lily 59
for (let a in p2) {
  console.log(p2[a]);
}
// Eva 99


/************************************************************************/
/************************************************************************/
/************************************************************************/
/************************************************************************/
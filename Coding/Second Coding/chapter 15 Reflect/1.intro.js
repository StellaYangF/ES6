// 1) versus
// before
try {
  Object.defineProperty(target, property, attribute);
  // success
} catch (err) {
  // failure
}
// now
if (Reflect.defineProperty(target, property, attribute)) {
  // success
}else {
  // failure
}

const obj  = { name: 'Jim' };
Object.freeze(obj);
const descriptor = { value: 'Lily' };
Object.defineProperty(obj, 'name', descriptor); 
// Uncaught TypeError: Cannot redefine property: name
Reflect.defineProperty(obj, 'name', descriptor)
// false

// 2) example
// before
'assign' in Object;   //true
// after
Reflect.has(Object, 'assign');    // true

// 3) example
const target = { name: "Lily" };
const p = new Proxy(target, {
  set (target, prop, value, receiver) {
    const success = Reflect.set(target, prop, value. receiver);
    if (success) {
      console.log(`property ${prop} on ${target} set to ${value}`)
    }
    return success;
  }
})
p.name = 'Tom';
// property name on [object Object] set to tom
// "tom"
// 上面代码中，Proxy方法拦截target对象的属性赋值行为。它采用Reflect.set方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能。

// 4) example
const obj = { name : 'Tom' };
const loggedObj = new Proxy(obj, {
  get (target, prop) {
    console.log(`get ${target} ${prop}`);
    return Reflect.get(target, prop);
  },
  deleteProperty (target, prop) {
    console.log(`delete ${prop}`);
    return Reflect.deleteProperty(target, prop);
  },
  has (target, prop) {
    console.log(`has ${prop}`);
    return Reflect.has(target,prop);
  }
});
loggedObj.name; 
// get [object Object] name
// "Tom"
delete loggedObj.name;
// delete name
// true
"name" in  loggedObj;
// has name
// false

// 5) more readable 
Function.prototype.apply.call(Math.floor, undefined, [1.75]);
Reflect.apply(Math.floor, undefined, [1.75]);
// 1
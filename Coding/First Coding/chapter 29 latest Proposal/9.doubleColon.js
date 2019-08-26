// 箭头函数可以绑定this对象，大大减少了【显式绑定】this对象的写法（call、apply、bind）。
// 但是，箭头函数并不适用于所有场合，所以现在有一个提案，提出了“函数绑定”（function bind）运算符，
// 用来取代call、apply、bind调用。

// 函数绑定运算符是并排的两个冒号（::），双冒号左边是一个对象，右边是一个函数。
// 该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

foo :: bar; 
// equals to
bar.bind(foo);

foo :: bar(...args);
bar.apply(foo, args);

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return obj :: hasOwnProperty(key);
}

// 如果双冒号左边为空，右边是一个对象的方法，则等于将该方法绑定在该对象上面。

var method = obj::obj.foo;
// 等同于
var method = ::obj.foo;

let log = ::console.log;
// 等同于
var log = console.log.bind(console);

// 如果双冒号运算符的运算结果，还是一个对象，就可以采用链式写法。

import { map, takeWhile, forEach } from "iterlib";

getPlayers()
::map(x => x.character())
::takeWhile(x => x.strength > 100)
::forEach(x => console.log(x));
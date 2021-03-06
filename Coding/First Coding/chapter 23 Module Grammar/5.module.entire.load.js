// 模块的整体加载

// 除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。

// 下面是一个circle.js文件，它输出两个方法area和circumference。

// circle.js
export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference (radius){
  return 2 * Math.PI * radius;
}

// 现在，加载这个模块。
// main.js
import {area, circumference} from './circle';

console.log('area' + area(4));
console.log('circumference' + area(14));

// 上面写法是逐一指定要加载的方法，整体加载的写法如下。

import * as circle from './circle';

console.log('area' + circle.area(4));
console.log('circumference' + circle.area(14));

// 注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};


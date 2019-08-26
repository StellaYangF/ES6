// export default 命令

// 从前面的例子可以看出，使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。
// 但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

// 为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。

// export-default.js
export default function() {
  console.log('foo');
}
// 上面代码是一个模块文件export-default.js，它的默认输出是一个函数。

// 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。

// import-default.js
import customName from './export-default.js'
customName();// 'foo'

// 上面代码的import命令，可以用任意名称指向export-default.js输出的方法，
// 这时就不需要知道原模块输出的函数名。

/******** 需要注意的是，这时import命令后面，不使用大括号。 ********/ 

// export default命令用在非匿名函数前，也是可以的。

// export-default.js
export default function foo() {
  console.log('foo');
}

// OR
function foo(){
  console.log('foo');
}
export default foo;

// 上面代码中，foo函数的函数名foo，在模块外部是无效的。加载的时候，【视同匿名函数加载】。


// 下面比较一下默认输出和正常输出。
// first group
export default function crc32(){
  // ...
}
import crc32 from 'crc32';

// second group
export function crc32() {/* ... */};
import {crc32} from 'crc32';

// 上面代码的两组写法，第一组是使用export default时，对应的import语句不需要使用大括号；
// 第二组是不使用export default时，对应的import语句需要使用大括号。

/*********** reason**************/ 
// export default命令用于指定模块的默认输出。
// 显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。
// 所以，import命令后面才不用加大括号，因为只可能唯一对应export default命令。

// 本质上，export default就是输出一个叫做default的变量或方法，
// 然后系统允许你为它取任意名字。所以，下面的写法是有效的。

// module.js
function add(x, y){
  return x * y;
}
export {add as default};
// equals to
export default add;
import {default as add } from 'module' ;
// equals to
import foo from 'module'

// 正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。

// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;

// 上面代码中，export default a的含义是将变量a的值赋给变量default。所以，最后一种写法会报错。

// 同样地，因为export default命令的本质是将后面的值，赋给default变量，所以可以直接将一个值写在export default之后。

// right
export default 42;
// wrong
export 42;

// 上面代码中，后一句报错是因为没有指定对外的接口，而前一句指定对外接口为default。

// 有了export default命令，输入模块时就非常直观了，以输入 lodash 模块为例。

import _ from 'lodash';


// 如果想在一条import语句中，同时输入默认方法和其他接口，可以写成下面这样。

import _, { each, forEach } from 'lodash';


// 对应上面代码的export语句如下。
export default function (obj) {/* ...*/};
export function each () {}
export {each as forEach};

// 上面代码的最后一行的意思是，暴露出forEach接口，默认指向each接口，
// 即forEach和each指向同一个方法。

// export default也可以用来输出类。

// MyClass.js
export default class {/*...*/}

// main.js
import MyClass from 'MyClass';
let o = new MyClass();


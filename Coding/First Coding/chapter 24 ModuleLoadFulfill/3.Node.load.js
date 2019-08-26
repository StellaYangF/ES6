// Node 加载

// Node 对 ES6 模块的处理比较麻烦，因为它有自己的 CommonJS 模块格式，与 ES6 模块格式是不兼容的。
// 目前的解决方案是，将两者分开，ES6 模块和 CommonJS 采用各自的加载方案。

// Node 要求 ES6 模块采用.mjs后缀文件名。
// 也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。
// require命令不能加载.mjs文件，会报错，只有import命令才可以加载.mjs文件。
// 反过来，.mjs文件里面也不能使用require命令，必须使用import。

// 目前，这项功能还在试验阶段。安装 Node v8.5.0 或以上版本，要用--experimental-modules参数才能打开该功能。



// 内部变量

// ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。
// 为了达到这个目标，Node 规定 ES6 模块之中不能使用 CommonJS 模块的特有的一些内部变量。

// 首先，就是this关键字。ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶层this指向当前模块，
// 这是两者的一个重大差异。

// 其次，以下这些顶层变量在 ES6 模块之中都是不存在的。

/* 
    arguments
    require
    module
    exports
    __filename
    __dirname
*/ 

// 如果你一定要使用这些变量，有一个变通方法，就是写一个 CommonJS 模块输出这些变量，
// 然后再用 ES6 模块加载这个 CommonJS 模块。
// 但是这样一来，该 ES6 模块就不能直接用于浏览器环境了，所以不推荐这样做。

// expose.js
module.exports = {__dirname};

// use.mjs
import expose from './expose.js';
const {__dirname} = expose;

// 上面代码中，expose.js是一个 CommonJS 模块，输出变量__dirname，
// 该变量在 ES6 模块之中不存在。ES6 模块加载expose.js，就可以得到__dirname。


// ES6 模块加载 CommonJS 模块
// CommonJS 模块的输出都定义在module.exports这个属性上面。
// Node 的import命令加载 CommonJS 模块，Node 会自动将module.exports属性，
// 当作模块的默认输出，即等同于export default xxx。

// 下面是一个 CommonJS 模块。
// a.js
module.exports = {
  foo: 'hello',
  bar: 'world',
}

// 等同于
export default {
  foo : 'hello',
  bar: 'world',
}

// import命令加载上面的模块，module.exports会被视为默认输出，
// 即import命令实际上输入的是这样一个对象{ default: module.exports }。

// 所以，一共有三种写法，可以拿到 CommonJS 模块的module.exports。

// method 1
import baz from './a';
// baz = {foo: 'hello', bar: 'world'}

// method 2
import {default as baz} from './a';
// baz = {foo: 'hello', bar: 'world'}

// module 3
import * as baz from './a';

// baz = {
  // get default() {return module.exprots;},
  // get foo() {return this.default.foo}.bind(baz),
  // get baz() {retrun this.default.bar}.bind(baz),
// }

// 上面代码的第三种写法，可以通过baz.default拿到module.exports。
// foo属性和bar属性就是可以通过这种方法拿到了module.exports。

// 下面是一些例子。
// b.js
module.exports = null;

// es.js
import foo from './b';
// foo = null;

import * as bar from './b';
// bar = {default: null};

// 上面代码中，es.js采用第二种写法时，要通过bar.default这样的写法，才能拿到module.exports。
// c.js
module.exports = function two() {
  return 2;
}

// es.js
import foo from './c';
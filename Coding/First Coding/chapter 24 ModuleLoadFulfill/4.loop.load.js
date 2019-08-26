// “循环加载”（circular dependency）指的是，a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。

// a.js
let b = require('b');
// b.js
let a = require('a');

// 通常，“循环加载”表示存在强耦合，如果处理不好，还可能导致递归加载，使得程序无法执行，因此应该避免出现。

// 但是实际上，这是很难避免的，尤其是依赖关系复杂的大项目，很容易出现a依赖b，b依赖c，c又依赖a这样的情况。
// 这意味着，模块加载机制必须考虑“循环加载”的情况。

// 对于 JavaScript 语言来说，目前最常见的两种模块格式 CommonJS 和 ES6，
// 处理“循环加载”的方法是不一样的，返回的结果也不一样。

// CommonJS 模块的加载原理
// 介绍 ES6 如何处理“循环加载”之前，先介绍目前最流行的 CommonJS 模块格式的加载原理。

// CommonJS 的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象。

{
  id: '...',
  exports: {/*...*/},
  loaded: true,
  // ...
}

// 上面代码就是 Node 内部加载模块后生成的一个对象。该对象的id属性是模块名，
// exports属性是模块输出的各个接口，loaded属性是一个布尔值，表示该模块的脚本是否执行完毕。
// 其他还有很多属性，这里都省略了。

// 以后需要用到这个模块的时候，就会到exports属性上面取值。
// 即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值。
// 也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，
// 以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

// CommonJS 模块的循环加载
// CommonJS 模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。
// 一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

// 让我们来看，Node 官方文档里面的例子。脚本文件a.js代码如下。
exports.done = false;
var b = require('./b.js');
console.log('在a.js之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js执行完毕');

// 上面代码之中，a.js脚本先输出一个done变量，然后加载另一个脚本文件b.js。
// 注意，此时a.js代码就停在这里，等待b.js执行完毕，再往下执行。


// 再看b.js的代码。
exports.done = false;
var a = reuqire('./a.js');
console.log('在b.js之中，a.done = % j', a.done);
exports.done = true;
console.log('b.js执行完毕')




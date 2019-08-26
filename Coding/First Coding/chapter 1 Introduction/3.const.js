/* 一：  const声明一个只读的常量 */ 
// 1.1   一旦声明，常量的值不可变
// 1.2   一旦声明，必须立即初始哈，不能留到以后再赋值
const f;      // SyntaxError: Missing initializer in const declaration

// 1.3    与let命令相同，只在声明所在的块级作用域内有效
if(true) {
  const MAX = 5;
}
MAX;    // ReferenceError:MAX is not defined.

// 1.4     不存在提升，同样存在TDZ 暂时性死区，只能在声明的位置后面使用
if(true){
  console.log(MAX);     // ReferenceError: MAX is not defined.
  const MAX = 5;
}

// 1.5      不可重复声明


/*   const本质：
** const实际上保证的，并不是变量的值不得改动，而是变量指向的那个【内存地址】所保存的数据不得改动
** 对于简单类型的数据(数值，字符串，布尔值)，【值】就保存在变量指向的那个【内存地址】，因此就等同于常量；
** 但对于复合型的数据(主要是对象和数组)，变量指向的内存地址，保存的只是一个【指向实际数据的指针】，
** const只能保证这个【指针】是固定的(即总是指向另一个固定的地址)，至于它指向的数据是不是可变的，就完全不能控制，
** 故：将一个对象声明为常量必须非常小心
*/ 
const foo ={};
foo.prop = 123;
foo.prop;     // 123

foo = {};     // 重新指向另一个对象，就会报错
// TypeEffor: "foo" is read-only;
// foo 指向的对象本身是可写的，但将另一个对象赋值给a就会报错
// 如果想冻结对象，使用Object.freeze()
const foo = Object.freeze({});
foo.prop = 123;
// 常规模式下不会报错，也不会改变foo的对象
// 严格模式下，则会报错
// 对象的属性也应该冻结，下面将一个对象彻底冻结
var constantize = (obj) =>{
  Object.freeze(obj);
  Object.keys(obj).forEach((key,i) =>{
    if(typeof obj[key] === "object"){
      constantize(obj[key]);      // 递归查询对象下嵌套的属性保存的对象
    }
  })
}

// 变量申明的方式共 6 种
// ES5: var  function
// ES6: let  const  import class

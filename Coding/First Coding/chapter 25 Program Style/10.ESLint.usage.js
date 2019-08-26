// ESLint 的使用
// ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。

// 首先，安装 ESLint。

var unused = 'I have no purpose!';

function greet() {
    var message = 'Hello, world!';
    alert(message);
}
greet();

/*  
  $ eslint 10.ESLint.usage.js
  index.js
    1:1  error  Unexpected var, use let or const instead          no-var
    1:5  error  unusued is defined but never used                 no-unused-vars
    4:5  error  Expected indentation of 2 characters but found 4  indent
    4:5  error  Unexpected var, use let or const instead          no-var
    5:5  error  Expected indentation of 2 characters but found 4  indent

  ✖ 5 problems (5 errors, 0 warnings)
*/
// 上面代码说明，原文件有五个错误，其中两个是不应该使用var命令，而要使用let或const；
// 一个是定义了变量，却没有使用；另外两个是行首缩进为 4 个空格，而不是规定的 2 个空格。


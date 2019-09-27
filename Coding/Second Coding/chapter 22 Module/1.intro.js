// CommonJS
let { stat, exists, readFile } = require("fs");
// fs整个对象都引入了进来，包括用不到的fs对象下的方法

// ES6
import { stat, exists, readFile } from "fs";
// 编译时加载，只加载了其中的三个方法
// 使得静态分析成为可能，可进一步扩宽 JS语法，如引入宏(macro) 和 类型校验(type system)

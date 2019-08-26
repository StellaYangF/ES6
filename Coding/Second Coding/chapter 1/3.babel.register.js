require ('@babel/register');
let Person = require('./1.example.js');

// 撰写require命令，加上一个钩子；
// 此后每当使用require加载.js, .jsx, .es, .es6后缀名文件，会先用Babel进行转码。
// 由于是实时转码，只适合在开发环境使用
new Person('Lily').say()();
// 参数默认值
function log(x,y){
  y = y || "World";
  console.log(x,y);
}
log("Hello");       // Hello World
log("Hello","China"); // Hello China
log("Hello","");  // 尽管赋值为空""，仍然被改为默认值
// 解决方法1：添加判断，是否赋值(在不赋值，或者赋值为undefined时)
function log(x,y){
  if(typeof y === "undefined") y = "World"
  console.log(x,y);
}
// 解决方法2：
function log(x, y = "World"){
  console.log(x,y);
}

// ES6参数默认
// 避免
function Point(x=0,y=0){
  this.x = x;
  this.y = y;
}
const p = new Point();

// 2: 对象的解构赋值默认值，无函数参数的默认值
function foo({ x, y = 5 }) {
  console.log(x, y);
}
foo({}); // undefined 5
foo({ x: 1 }); //1 5
foo({ x: 1, y: 2 }); // 1 2
foo(); //Cannot destruct property "x" of undefined or "null"

// 对象的解构赋值默认值。函数的默认值
function foo({ x, y = 5 } = {}) {
  console.log(x, y);
}
foo()   // undefined 5    

// example
function fetch(url,{body = "", method = "GET", headers = {}}){
  console.log(method);
}
fetch("http://baidu.com",{})      //  GET
fetch("http://baidu.com")         //Uncaught TypeError: cannot destruct property "boyd" of "undefined" or "null"

// 改进，避免报错：双重默认值
function fetch(url,{body="", method = "GET", headers = {}}={}){
  console.log(method);
}
fetch("http://baidu.com");      //不报错  "GET"
// 先参数的默认值生效，然后才是解构赋值的默认值生效

// Attention:::
// 参数的默认值位置，应该是在尾部，这样比较容易看出来，到底省略了哪些参数，如果非尾部的参数设置了默认值，就会报错，实际上这个参数是没法省略的
function f(x = 1, y){
  return [x,y];
}
f();    // [1, undefined]
f(2);   //[2, undefined]
f(,1);  //Uncaught SyntaxError: Unexpected token ,
f(undefined , 1);     //  [1, 1]
// 如果传入undefined，将触发该参数等于默认值，null则没有这个效果




// 指定了默认值之后，函数的length竖向，将返回没有指定默认值的参数个数，即：指定了默认值后，length属性将失真
(function(a) {}.length); //1
((a = 1) => {}).length; // 0
((a, b, c = 5) => {}).length; //2
// reason: 
//1: length的属性含义是：该函数预期【传入】的参数个数。
// 某个参数指定默认值之后，预期传入的参数个数就不包括这个参数了。
// 同理，rest参数也不会计入length属性
((...args)=>{}).length;   //0


//2: 如果设置了默认值的参数不是尾参数，length属性也不再计入后面的参数
((a=1, b, c) => {}).length;     // 0
((a, b=1, c) => {}).length;     // 1
((a, b, c=3) => {}).length;     // 2



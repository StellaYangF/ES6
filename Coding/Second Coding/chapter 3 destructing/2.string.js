const [a, b, c, d, e] = 'hello';
let {length} = 'hello';
console.log(a,b,c,d,e,length);

let { toString } = 123;
console.log(toString === Number.prototype.toString) //true

let { toString } = true;
console.log(toString === Boolean.prototype.toString) //true

let {prop: x} = undefined;
// TypeError: Cannot destructure property `prop` of 'undefined' or 'null'.
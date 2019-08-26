import arr from './module2.js';

const x = 1; 
console.log(x === window.x);    // false;

console.log(this === undefined);    //true

export default arr;
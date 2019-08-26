// Smbol() as object's property

const nameSymbol =  Symbol();

let a  = {};

Object.defineProperty(a, nameSymbol, {
  value: "hello"
})

console.log(a[nameSymbol]);


const PENDING = Symbol();
const REJECTED = Symbol();
const FULFILLED = Symbol();


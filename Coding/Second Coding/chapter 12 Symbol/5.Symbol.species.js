class ArrayModel extends Array {
  // static get [Symbol.species] () {
  //   return this;
  // }
}

let a = new ArrayModel(1,2,3);
let b = a.map( n => n);
let c = a.map( n => n * 2);
b instanceof ArrayModel;    // true
c instanceof ArrayModel;    // true

// set [Symbol.species]() { return this; }
class ArrayModel extends Array {
  static get [Symbol.species] () {
    return Array;
  }
}
let a = new ArrayModel(1,2,3);
let b = a.map( n => n);
let c = a.map( n => n * 2);
console.log(b instanceof ArrayModel);    // false
console.log(c instanceof Array);         // true 
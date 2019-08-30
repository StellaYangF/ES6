let numArray, concatArray, likeArray, isConcatSpreadable;
let { log } = console;

/* Array */ 
numArray = [ 3, 4];
concatArray = [1, 2].concat(numArray, 5);                      // [1,2,3,4,5];
isConcatSpreadable = numArray[Symbol.isConcatSpreadable];      // default: undefined
log(concatArray, isConcatSpreadable);

numArray[Symbol.isConcatSpreadable] = false;    //false
concatArray = [1, 2].concat(numArray, 5);       // [1,2, [ 3, 4 ], 5]                  // [1,2,3,4,5];
log(concatArray, isConcatSpreadable);


/* likeArray */ 
likeArray = { 0: 'c', 1: 'd', length:2 };
concatArray = [ 'a', 'b' ].concat(likeArray, 'e');
isConcatSpreadable = likeArray[Symbol.isConcatSpreadable];
console.log(concatArray, isConcatSpreadable);   
// [ 'a', 'b', { '0': 'c', '1': 'd', length: 2 }, 'e' ]
// undefined  default：not spread

isConcatSpreadable = likeArray[Symbol.isConcatSpreadable] = true;
concatArray = [ 'a', 'b' ].concat(likeArray, 'e');
console.log(concatArray, isConcatSpreadable);   
// [ 'a', 'b', 'c', 'd', 'e' ]
// true

/* Symbol.isConcatSpreadable can be defined to class (instance/ class) */ 
class A1 extends Array{
  constructor (args) {
    super(args);
    this[Symbol.isConcatSpreadable] = true;
  }
}
class A2 extends Array{
  constructor (args) {
    super(args);
  }
  get [Symbol.isConcatSpreadable]  () {
    return false;
  }
}
let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
concatArray = [1, 2].concat(a1).concat(a2)
console.log(concatArray);
// [ 1, 2, 3, 4, A2 [ 5, 6 ] ]
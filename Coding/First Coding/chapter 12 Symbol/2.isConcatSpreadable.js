// Array instance default is spread
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e');

arr1[Symbol.isConcatSpreadable]   // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a','b'].concat(arr2,arr1);


// structured array default is no-spread
let obj = {length:2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj,'e');
obj[Symbol.isConcatSpreadable] = true;

// Symbol.isContentSpreadable can be set in a class
class A1 extends Array{
  constructor(args){
    super(args);
    this[Symbol.isConcatSpreadable] = true;
  }
}

class A2 extends Array{
  constructor(args){
    super(args);
  }
  get [Symbol.isConcatSpreadable](){
    return false;
  }
}

let a1 = new A1(),
    a2 = new A2();
a1[0] = 3;
a1[1] = 4;
a2[0] = 5;
a2[1] = 6;
[1, 2].concat(a1, a2);


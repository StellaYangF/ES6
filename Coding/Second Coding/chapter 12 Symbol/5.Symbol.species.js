class ArrayModel extends Array {}

let a = new ArrayModel(1,2,3);
let b = a.map( n => n);
let c = a.map( n => n * 2);
b instanceof ArrayModel;
c instanceof ArrayModel;

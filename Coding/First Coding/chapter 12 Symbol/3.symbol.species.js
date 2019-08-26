class MyArray extends Array {} // subclass extends superclass
const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

b instanceof MyArray; // true
c instanceof MyArray; // true


class MyArray1 extends Array{
  static get [Symbol.species](){
    return Array
  }
}
const a1 = new MyArray1(1,2,3,4);
b1 = a1.map(x => x);
b1 instanceof MyArray1;
b1 instanceof MyArray;

// example 2:
class T1 extends Promise{}
class T2 extends Promise{
  static get [Symbol.species](){
    return Promise;
  }
}
new T1(r=>r()).then(v=>v) instanceof T1;
new T2(r=>r()).then(v=>v) instanceof T2;



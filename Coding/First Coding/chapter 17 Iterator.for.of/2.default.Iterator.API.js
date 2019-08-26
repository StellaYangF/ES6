// 默认 Iterator 接口
// Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环（详见下文）。
// 当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

// 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。

// ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，
// 或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。
// Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。
// 执行这个函数，就会返回一个遍历器。至于属性名Symbol.iterator，
// 它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值，
// 所以要放在方括号内（参见《Symbol》一章）。

const obj = {
  [Symbol.iterator] (){
    return {
      next(){
        return {
          value :1 , 
          done: false
        }
      }
    }
  }
};
// 原生具备 Iterator 接口的数据结构如下。
/* 
  Array
  Map
  Set
  String
  TypedArray
  函数的 arguments 对象
  NodeList 对象
*/ 

// 下面的例子是数组的Symbol.iterator属性。
let arr = ["a", "b", "c"];
let iter = arr[Symbol.iterator]();
iter.next()   

// 一个对象如果要具备可被for...of循环调用的 Iterator 接口，
// 就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。
class RangeIterator {
  constructor(start , stop){
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator](){ return this;}

  next(){
    let value = this.value;
    if(value < this.stop){
      this.value ++;
      return {
        done: false, value: value
      }
    }
    return {
      done: true, value: undefined
    }
  }
}

function range(start , stop){
  return new RangeIterator(start, stop);
}

for(let value of range(0, 10)){
  console.log(value);
}

// 下面是通过遍历器实现指针结构的例子。
function Obj(value){
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function() {
  let iterator = { next : next};

  let current = this;

  function next(){
    if(current){
      let value = current.value;
      current = current.next;
      return {done: false, value :value};
    }else {
      return {done: true};
    }
  }
  return iterator;
}

one = new Obj(1);
two = new Obj(2);
three = new Obj(3);

one.next = two;
two.next = three;

for(let i of one){
  console.log(i);
}

// 下面是另一个为对象添加 Iterator 接口的例子。

let obj = {
  data: ["hello", "world"],
  [Symbol.iterator](){
    const self = this;
     let index = 0;
     return{
       next(){
         if( index < self.data.length){
           return {
             value: self.data[index++],
             done:false
           }
         }else return { value: undefined, done:true};
       }
     }
  }
}

// 对于类似数组的对象（存在数值键名和length属性），部署 Iterator 接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的 Iterator 接口。
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// OR
NodeList.prototype[Symbol.iterator] =[][Symbol.iterator];

[...document.querySelectorAll('div')] //可执行

// NodeList 对象是类似数组的对象，本来就具有遍历接口，可以直接遍历。
// 上面代码中，我们将它的遍历接口改成数组的Symbol.iterator属性，可以看到没有任何影响。

// 下面是另一个类似数组的对象调用数组的Symbol.iterator方法的例子。
let iterable = {
  0 : 'a',
  1 : 'b',
  2 : 'c',
  length : 3,
  [Symbol.iterator] : Array.prototype[Symbol.iterator]
}

for(let item of iterable){
  console.log(item);
}

// 注意，普通对象部署数组的Symbol.iterator方法，并无效果。
let iterable = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // undefined, undefined, undefined
}

let $iterator = iterable[Symbol.iterator]();
let $result = $iterator.next();
while(!$result.done){
  let x = $result.value;
  console.log(x);
  $result = $iterator.next();
}

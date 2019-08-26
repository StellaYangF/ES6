let arr1 = ['c', 'd'];
console.log(['a', 'b'].concat(arr1, 'e'));
// [ 'a', 'b', 'c', 'd', 'e' ]
console.log(arr1[Symbol.isConcatSpreadable])
// undefined

let arr2= ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
console.log(['a', 'b'].concat(arr2, 'e'));
// [ 'a', 'b', ['c', 'd'], 'e' ]


let obj = {length: 2, 0: 'c', 1: 'd'};
console.log(['a', 'b'].concat(obj, 'e'));
// 类数组默认不展开
// [ 'a', 'b', { '0': 'c', '1': 'd', length: 2 }, 'e' ]
obj[Symbol.isConcatSpreadable] = true;
console.log(['a', 'b'].concat(obj, 'e'));
// 设置后可展开


class A1 extends Array{
  constructor(arg) {
    super(arg);
    // 定义在实例上
    this[Symbol.isConcatSpreadable] = true;
  }
}

class A2 extends Array{
  constructor(arg) {
    super(arg);
  }
  get [Symbol.isConcatSpreadable] () {
    return false;
  }
}

let a1 = new A1();
a1[0] = 1;
a1[1] = 2;
console.log(['a', 'b'].concat(a1));
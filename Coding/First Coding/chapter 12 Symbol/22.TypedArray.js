// 类数组函数部署有Array遍历器接口： 参数对象arguments, NodeList
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  length: 4,
  [Symbol.iterator]: Array.prototype[Symbol.iterator],
}

for( let value of iterable){
  console.log(value);
}

let $iterator = iterable[Symbol.iterator]();
let $result = $iterator.next();
while(!$result.done) {
  $result = $iterator.next();
  console.log($result.value)
}

// 普通对象则无效
let iterable2 = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  length: 4,
  [Symbol.iterator]: Array.prototype[Symbol.iterator],
}

for( let value of iterable2){
  console.log(value);
}
// undefined
const s = new Set();
const arr = [1, 2, 3, 4, 5, 1, 2, 3];
const likeArray = { 0: 'a', 1: 'b', 2: 'a', length: 3 , *[Symbol.iterator] () {
  yield this[0];
  yield this[1];
}};
let set;
arr.map(n => s.add(n));

console.log(s, [...s]);
// Set { 1, 2, 3, 4, 5 }
// [ 1, 2, 3, 4, 5 ]

/* array as params */ 
set = new Set(arr);
[...set];
// [1,2,3,4,5]

/* likeArray as params */ 
set = new Set(likeArray);
[...set]
// ['a', 'b']

set.size
// 2


// two objects are always different
let set = new Set();
set.add({});
set.size  //1
set.add({});
set.size  //2

// Array omit duplicated value
function dedupe (array) {
  return [...new Set(array)];
  return Array.from(new Set(array));
}

// .values & .keys have the same behabior
let set = new Set([ 1, 2, 3, 4 ]);
for(let key of set.keys())  {
  console.log(key);
}
// 1 2 3 4

let set = new Set([ 1, 2, 3, 4 ]);
for(let value of set.values())  {
  console.log(value);
}
// 1 2 3 4

let set = new Set([ 1, 2, 3, 4 ]);
for(let [key, value] of set.entries())  {
  console.log('key', key, 'value', value);
}
// key 1 value 1
// key 2 value 2
// key 3 value 3
// key 4 value 4

let set = new Set([ 1, 2, 3, 4 ]);
for(let entry of set.entries())  {
  console.log('entry', entry);
}
// entry [ 1, 1 ]
// entry [ 2, 2 ]
// entry [ 3, 3 ]
// entry [ 4, 4 ]

let set = new Set([ 1, 2, 3, 4 ]);
set.forEach((value, key) => console.log(value, key));
// 1 1
// 2 2
// 3 3
// 4 4

/* appilcation */ 
let s1 = new Set([1, 2, 3]);
let s2 = new Set([4, 2, 3]);
// union
let uniion = new Set([...s1, ...s2])  // { 1, 2, 3, 4 }
// intersect
let intersect = new Set([...s1].filter(n => s2.has(n)));    // { 2, 3 }
// difference
let difference = new Set([...s1].filter(n => !s2.has(n)))   // { 1 }

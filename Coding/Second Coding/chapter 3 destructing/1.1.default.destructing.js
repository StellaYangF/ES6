let [ foo = true] = [ null ];       // null
let [ foo = true] = [ false ];      // false
let [ foo = true] = [ '' ];         // ''
let [ foo = true] = [ 0 ];          // 0
let [ foo = true] = [ NaN ];        // NaN
let [ foo = true] = [ undefined ];  // true

// === 'undefined' ? default makes sense

foo = NaN || 'timeer';
console.log(foo);


// lazy operate value
function f() {
  console.log('aaa');
} 

let [ x = f() ] = [1];
// here f() will not invoke

// equals to the following code
let x;
if ([1][0] === undefined) {
  x = f();
}else {
  x = [1][0];
}

const {log} = console;
log('1');

let arr = [1, 2, 3];
let {0: first, [arr.length - 1]: last} = arr;
console.log(first, last);


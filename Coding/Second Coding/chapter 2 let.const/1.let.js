// let: features:
// (1) [Teperal Dead Zone]
function fun(a = b, b =2) {
  return [x, y];
}
fun();

// equals to 
typeof x;  // here exists TDZ
let x = 2;
// To avoid to use variables bedore declaration


// (2) Don't declare a declared variable.

function fun() {
  let a = 10; 
  let a = 1;
}
// SyntaxError: 'a' has already been declared

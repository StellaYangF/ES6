// 使用数组成员对变量赋值时，优先使用解构赋值。
const arr = [1, 2, 3, 4, 5];

// bad
const first = arr[0];
const second = arr[2];

// good
const [first, second,...rest] = arr;


// 函数的参数如果是对象的成员，优先使用解构赋值。
// bad
function getFullName(user) {
  const firstName = user.first;
  const lastName = user.lastName;
}
// good
function getFullName(obj){
  const {firstName, lastName} = obj;
}
// best
function getFullName({firstName, lastName}){

}

// 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。
// 这样便于以后添加返回值，以及更改返回值的顺序。
// bad
function processInput(input){
  return [left, right, top, bottom];
}
// good
function processInput(input) {
  return {left, right, top, bottom};
}
const {left, right} = processInput(input);

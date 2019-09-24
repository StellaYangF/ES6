// 如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。
function* gen () {
  yield "a";
  yield "b";
}
function* bar() {
  yield "x";
  for (let i of gen()) {
    console.log(i);
  };
  yield "y";
}

for (let v of bar()) {
  console.log(v);
}
// x a b y
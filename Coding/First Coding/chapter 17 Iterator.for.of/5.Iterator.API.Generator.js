let obj = {
  [Symbol.iterator]:function*(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
  }
}

[...obj];
// [1, 2, 3, 4, 5]

let obj = {
  *[Symbol.iterator](){
    yield "hello";
    yield "world"
  }
}
for(let item of obj){
  console.log(item);
}
[...obj]  //["hello", "world"]
const myIterator = {};
myIterator[Symbol.iterator] = function* (){
  yield 1;
  yield 2;
  yield 3;
}



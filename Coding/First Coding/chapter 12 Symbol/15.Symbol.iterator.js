const myIterator = {};
myIterator[Symbol.iterator] =function* () {
  yield 1;
  yield 2;
  yield 3;
}

console.log([...myIterator]);

for(let key of myIterator){
  console.log(key);
}
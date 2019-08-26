const MyIterator = {};
MyIterator[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
};
[...MyIterator]
// [1, 2, 3, 4]
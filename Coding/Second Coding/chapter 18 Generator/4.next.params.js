const gen = function* () {
  let r1 = yield 1;
  console.log(r1);
  let r2 = yield r1;
};

let g = gen();
g.next(2);
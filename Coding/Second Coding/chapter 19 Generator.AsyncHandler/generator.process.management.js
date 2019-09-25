let fs = require("fs"),
    { resolve } = require("path"),
    thunkify = require("thunkify"),
    readFileThunk = thunkify(fs.readFile);

let gen = function* () {
  let r1 = yield readFileThunk(resolve(__dirname,"./name.txt"));
  console.log(r1.toString());
  let r2 = yield readFileThunk(resolve(__dirname,"./age.txt"));
  console.log(r2.toString());
}

// 手动执行上述函数
let g = gen(),
    r1 = g.next();
r1.value((err, data) => {
  if (err) throw err;
  let r2 = g.next(data);
  r2.value((err, data) => {
    if (err) throw err;
    g.next(data);
  })
})
// xiangju
// 18


// Thunk 函数真正的威力，在于可以自动执行 Generator 函数。下面就是一个基于 Thunk 函数的 Generator 执行器。

function run(fn) {
  let g = fn();

  function next(err, data)  {
    let result = g.next(data);  // result格式为 {value: callback, done: true/ false}
    if (result.done) return;
    result.value(next); // next是thunk的回调函数
  }

  next(); 
}

run(gen);
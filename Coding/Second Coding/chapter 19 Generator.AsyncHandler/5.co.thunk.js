// 基于thunk的自动执行

let fs = require("fs"),
    { resolve } = require("path"),
    thunkify = require("thunkify"),
    readFileThunk = thunkify(fs.readFile),
    run = require("./4.generator.thunk.js"),
    co = require("co");


let gen = function* () {
  let r1 = yield readFileThunk(resolve(__dirname,"./name.txt"));
  console.log(r1.toString());
  let r2 = yield readFileThunk(resolve(__dirname,"./age.txt"));
  console.log(r2.toString());
}

run(gen);
co(gen);


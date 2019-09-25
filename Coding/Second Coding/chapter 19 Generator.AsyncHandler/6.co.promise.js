// 基于Promise对象的自动执行
let { readFile } = require("fs"),
    { resolve : resolvePath } = require("path");

let readFilePromise = filename => new Promise((resolve, reject) => {
  readFile(resolvePath(__dirname,filename), (err, data) => {
    if (err) return reject(err);
    resolve(data);
  })
})

let gen = function*() {
  let f1 = yield readFilePromise( "./name.txt");
  let f2 = yield readFilePromise("./age.txt");
  console.log(f1.toString());
  console.log(f2.toString());
}

// 手动执行上述的Generator函数
// let g = gen();
// g.next().value.then(data => g.next(data).value.then(data => g.next(data))).catch(err => console.log(err));

// xiangju
// 18

// 结合上述，编写自动执行器
function run(gen) {
  let g = gen();

  function next(data = undefined) {
    let result = g.next(data);
    if (result.done) return result.value; 
    result.value.then( data => next(data));
  }

  next();
}

run(gen);
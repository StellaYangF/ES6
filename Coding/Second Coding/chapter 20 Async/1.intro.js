const { readFile } = require("fs"),
      { resolve: resolvePath } = require("path");

const readFilePromise = filename => new Promise((resolve, reject) => {
  readFile(resolvePath(__dirname, filename), (err, data) => {
    if (err) return reject(err);
    resolve(data);
  })
});

const asyncReadFile = async () => {
  let f1 = await readFilePromise("./name.txt"),
      f2 = await readFilePromise("./age.txt");
  console.log(f1.toString());
  console.log(f2.toString());
}

asyncReadFile().then(data => console.log(data));
const fs = require('fs');
const FILE_NAME = "./name.txt";
const FILE_AGE  = "./age.txt";

const readFile = fileName => new Promise((resolve, reject) => {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if(err) reject(err);
    resolve(data);
  })
})

const gen =async function () {
  const f1 = await readFile(FILE_NAME);
  const f2 = await readFile(FILE_AGE)
  console.log(f1);
  console.log(f2.toString());
}
gen()
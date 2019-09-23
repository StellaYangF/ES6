let fs= require("fs");
let tom = {};

fs.readFile("./age.txt", "utf8", function(err, data) {
  tom.age = data;
  console.log(tom);
});

fs.readFile("./name.txt", "utf8", function(err, data) {
  tom.name = data;
  console.log(tom);
});

console.log(process.cwd());
console.log(tom);

let readLinesSync = file => {
  console.log(file);
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { value: name, done: false };
        },
        return() {
          return { done: true };
        }
      };
    }
  };
};

for (let file of readLinesSync(readFileSync("./age.txt", "utf8", data => data))) {
  console.log(file);
  break;
}
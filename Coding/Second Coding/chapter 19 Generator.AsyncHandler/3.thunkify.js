let thunkify = require('thunkify');
let { readFile } = require("fs");
let { resolve } = require("path");

let read = thunkify(readFile);
read(resolve(__dirname,"./name.txt"))((err, data) => console.log(data.toString()));
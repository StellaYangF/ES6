const obj = { 1: "tom", 0: "age", length: 2 };
for (let pair of Array.from(obj)) {
  console.log(pair);
}
// age
// tom
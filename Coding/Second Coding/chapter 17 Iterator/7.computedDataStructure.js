let tom = new Map();
tom.set("name", "Tom");
tom.set("age", 18);
tom.set("hobbies", ["dancing", "singing", "reading"]);

for (let [key, value] of tom.entries()) {
  console.log(key, value);
}
// name Tom
// age 18
// hobbies [ 'dancing', 'singing', 'reading' ]

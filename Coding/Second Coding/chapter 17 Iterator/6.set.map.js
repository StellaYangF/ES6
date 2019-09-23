let engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (let engine of engines) {
  console.log(engine);
}
// Gecko
// Trident
// Webkit

let tom = new Map();
tom.set("name", "Tom");
tom.set("age", 18);
tom.set("hobbies", ["dancing", "singing", "reading"]);
for(let prop of tom) {
  console.log(prop);
}
// [ 'name', 'Tom' ]
// [ 'age', 18 ]
// [ 'hobbies', [ 'dancing', 'singing', 'reading' ] ]
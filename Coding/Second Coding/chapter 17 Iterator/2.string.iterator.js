const hello = 'hello';
let it = hello[Symbol.iterator]();
it.next();
// { value: "h", done: false }
for (let key of hello)  {
  console.log(key);
}
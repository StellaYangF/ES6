function* generator() {
  yield "Bonjour";
  yield "Madam";
  return "Bonjour!";
}

let gen = generator();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
// { value: 'Bonjour', done: false }
// { value: 'Madam', done: false }
// { value: 'Bonjour!', done: true }

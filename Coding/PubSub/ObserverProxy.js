const queuedObservers = new Set();
const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});
function set (target, key, value, receiver) {
  if (value === Reflect.get(target, key)) return;
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}

const person = observable({
  name: "Tom",
  age: 30,
})
function print () {
  console.log(`${person.name}, ${person.age}`);
}
observe(print);
person.name = 'Tom';
person.age = 27;
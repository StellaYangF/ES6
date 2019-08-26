const obj = {
  [Symbol('nage')]: 1,
  enum : 2,
  nonEnum: 3,
}

Object.getOwnPropertySymbols(obj);
// The following operation cannot get Symbol property
Object.getOwnPropertyNames(obj);
for(let p of Object.keys(obj)) {
  console.log('for...of', p);
}
for(let p of Object.keys(obj))  {
  console.log('for...in', p);
}
objJson = JSON.stringify(obj);
console.log(objJson);

// new API can make it
Reflect.ownKeys(obj);
// ["enum", "nonEnum", Symbol(nage)]

// Non private inside method
const size = Symbol('size');
class Collection {
  constructor() {
    this[size] = 0;
  }
  add (item) {
    this[this[size]] = item;
    this[size] ++;
  }
  static sizeOf(instance) {
    return instance[size];
  }
}
const x = new Collection();
Collection.sizeOf(x); // 0
x.add('tom');
Collection.sizeOf(x); // 1
x.add('Lily');
Collection.sizeOf(x); // 2



// Symbol.for()

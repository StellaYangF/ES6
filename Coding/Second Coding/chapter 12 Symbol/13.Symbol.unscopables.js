Array.prototype[Symbol.unscopables]

// copyWithin: true
// entries: true
// fill: true
// find: true
// findIndex: true
// flat: true
// flatMap: true
// includes: true
// keys: true
// values: true

const foo = () => 1;

class Class1 {
  foo () {
    return 2;
  }
}

with (Class1.prototype) {
  foo();
}
// 2

class Class2 {
  foo () {
    return 2;
  }
  get [Symbol.unscopables] () {
    return { foo: true}
  }
}

with (Class2.prototype) {
  foo();
}
// 1
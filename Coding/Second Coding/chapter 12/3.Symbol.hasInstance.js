class Person {
  [Symbol.hasInstance] (obj) {
    return obj instanceof Object;
  }
}

let obj = {name: "tom"};
obj instanceof new Person();    

class Even {
  static [Symbol.hasInstance] (num) {
    return Number(num) % 2 === 0;
  }
}

1 instanceof Even;      // false
2 instanceof Even;      // true

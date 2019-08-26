class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}


class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}

// 等同于
const Even1 = {
  [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
};

class C {
  static [Symbol.hasInstance] (foo) {
    return foo instanceof Array;
  }
}
const c1 = new C();
console.log(c1 instanceof C);
console.log([1,2,3,4] instanceof C);
// console.log([1,2,3,4] instanceof c1);


class Even {
  static [Symbol.hasInstance] (number) {
    return Number(number) % 2 === 0;
  }
}

console.log(1 instanceof Even);
console.log(2 instanceof Even);
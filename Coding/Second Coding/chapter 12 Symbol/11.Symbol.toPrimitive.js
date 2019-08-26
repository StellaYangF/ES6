// [Symbol.toPrimitive] (hint)
// Number
// String
// Default
const NUMBER = 'number';
const STRING = "string";
const DEFAULT = "default";

let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case NUMBER:
        return 123;
      case STRING:
        return "string";
      case DEFAULT:
        return "default";
      default:
        throw new Error();
    }
  }
};

1 * obj;      // 123
1 + obj;      // '1default'
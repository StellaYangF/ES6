class A {
  // 1) 最顶层能
  c = "c";

  constructor() {
    // 2) constructor内部
    this.a = "a";
    this.b = "b";
    return this;
  }

  toString(args) {
    return "arguments: " + args
  }
}
let a = new A();
// A {c: "c", a: "a", b: "b"}
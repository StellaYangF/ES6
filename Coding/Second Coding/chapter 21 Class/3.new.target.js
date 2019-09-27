// ES5
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error(`Person类必须使用 new 命令生成实例`);
  }
}

// OR
function Person (name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error(`Person类必须使用 new 命令生成实例`);
  }
}

Person();
// Error: 必须使用 new 命令生成实例

// ES6
class A {
  constructor(name) {
    if (new.target === A) {
      this.name = name;
    } else {
      throw new Error(`Person类必须使用 new 命令生成实例`);
    }
  }
}

// 注意子类继承父类时，new.target返回子类
class A {
  constructor(...args) {
    if (new.target === A) throw new Error(`A类必须使用 new 命令生成实例`);
    args.forEach(arg => this[arg] = arg);
  }
}


class B extends A {
  constructor(...args) {
    super(...args);
  }
}

let a = new A("tom", "age");
// Uncaught Error: A类必须使用 new 命令生成实例
let b = new B("tom", "age");
// {tom: "tom", age: "age"}
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
p1 = new Point(1, 2);

function Person(name) {
  if(new.target !== undefined){
    this.name = name;
  }else throw new Error("必须使用new命令生成实例");
}

// 需要注意的是，子类继承父类时，new.target会返回子类。
class Rectangle {
  constructor (length ,width=3 ){
    console.log(new.target === Rectangle);
  }
}
class Square extends Rectangle {
  constructor (length) {
    super(length);
  }
}
let obj = new Square(3);  // false

// 上面代码中，new.target会返回子类。
// 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。


class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确

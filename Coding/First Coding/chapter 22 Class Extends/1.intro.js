// Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

class Point {
  constructor(x, y) {
    this.x =x; 
    this.y =y;
  }

  toString() {
    return `(${x}, ${y})`;
  }
}

class ColorPoint extends Point {
}

// 上面代码定义了一个ColorPoint类，该类通过extends关键字，继承了Point类的所有属性和方法。
// 但是由于没有部署任何代码，所以这两个类完全一样，等于复制了一个Point类。
// s下面，我们在ColorPoint内部加上代码。

class ColorPoint extends Point {
  constructor (x, y, color){
    super(x, y);    // 调用父类的constructor(x, y);
    this.color = color;
  }

  toString(){
    return this.color + " " +super.toString();    //调用父类的toString()
  }
}

// 上面代码中，constructor方法和toString方法之中，都出现了super关键字，它在这里表示父类的构造函数，用来新建父类的this对象。

// 下面是生成子类实例的代码。

let cp = new ColorPoint(25, 8, 'green');

cp instanceof ColorPoint // true
cp instanceof Point 

// 最后，父类的静态方法，也会被子类继承。

class A {
  static hello() {
    console.log('hello world');
  }
}

class B extends A {}
// 上面代码中，hello()是A类的静态方法，B继承A，也继承了A的静态方法。


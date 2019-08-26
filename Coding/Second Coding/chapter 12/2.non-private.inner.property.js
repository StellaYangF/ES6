let size = Symbol('size');
class Collection {
  constructor () {
    this[size] = 0;
    // 类似于index
    // 每调用一次add方法，累加
  }

  add (item) {
    this[this[size]] = item;
    this[size] ++;
  }

  static sizeOf (instance) {
    return instance[size];
  }
}

let x = new Collection();
Collection.sizeOf(x);
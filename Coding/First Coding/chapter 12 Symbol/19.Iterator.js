function makeIterator(arr) {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex < arr.length
       ? { value: arr[nextIndex++], done: false}
       : { value: undefined, done: true}
    }
  }
}

let iter = makeIterator([1,2,3,4,5]);

// 首次调用的时候返回一个遍历器
// 再调用遍历器的next方法返回值
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())
console.log(iter.next())


const obj = {
  [Symbol.iterator] () {
    return {
      next() {
        return {
          value: 1,
          done: true
        }
      }
    }
  }
}
console.log(obj[Symbol.iterator]().next())
console.log(obj[Symbol.iterator]().next())


// 遍历器对象
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator] () { return this; }

  next () {
    let value = this.value;
    if (value < this.stop) {
      this.value++;
      return { value: value, done: false }
    }
    return { value: undefined, done: true }
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

const arr = [];
for(let value of range(0, 5)) {
  arr.push(value);
  console.log(arr);
}

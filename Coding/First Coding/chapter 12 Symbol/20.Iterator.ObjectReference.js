function Obj(value) {
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function () {
  let iterator = { next: next };
  let current = this;

  function next() {
    if (current) {
      let value = current.value;
      current = current.next;
      return { done: false, value: value };
    } else return { done: true };
  }
  return iterator;
}

const one = new Obj(1);
const two = new Obj(2);
const three = new Obj(3);

one.next = two;
two.next = three;
for( let i of one ) {
  console.log(i);
}
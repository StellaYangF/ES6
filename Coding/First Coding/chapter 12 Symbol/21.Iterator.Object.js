let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let nextIndex = 0;
    return {
      next () {
        if (nextIndex < self.data.length) {
          return { value: self.data[nextIndex++], done: false };
        } else return { value: undefined, done: true }
      }
    }
  }
}

for (let i of obj){
  console.log(i);
}
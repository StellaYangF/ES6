// 1) mock Iterator
function makeIterator (array) {
  let nextIndex = 0;
  return {
    next () {
      return nextIndex < array.length ?
        { value: array[nextIndex++], done: false} :
        { value: undefined, done: true}
    }
  }
}

let it = makeIterator(['a', 'b']);

function range(min, max) {
    return {
        get min() { return this.min },
        get max() { return this.max },
        includes: function(x) {
            return min <= x && x <= max;
        },
        toString: function() {
            return min + "--" + max;
        },
        [Symbol.iterator]: function() {
            let val = Math.ceil(min);
            return {
                next: function() {
                    if (val > max)
                        throw StopIteration;
                    return val++;
                },
            };
        }
    }
}

// for (let i in range(1, 5)) console.log(i);
let { min, max, includes, toString, [Symbol.iterator]: it} = rnage(1,6);

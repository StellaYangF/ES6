function co(gen) {
  let ctx = this;

  return new Promise((resolve, reject) => {
    if (typeof gen === "function") gen.call(ctx);
    if (!gen || typeof gen !== "function") resolve(gen);

    onFulfilled();

    function onFulfilled(res) {
      let ret;
      try {
        ret = gen.next(res);
      } catch (err) {
        return reject(err);
      }
      
      next(ret);

      function next(ret) {
        if (ret.done) return resolve(ret.value);
        let value = toPromise.call(ctx, ret.value);
        if (value && isPromise(value)) return value.then(onFulfilled, onRejected) {
          return onRejected(new TypeError(
            'You may only yield a function, promise, generator, array, or object, '
            + 'but the following object was passed: "'
            + String(ret.value)
            + '"'
          ))
        }
      }

    }
  })
}

// Handle simultaneous async operation
let co = require("co");

let onerror = err => console.log(err);
// Array
co(function* () {
  let res = yield [
    Promise.resolve(1),
    Promise.resolve(2),
  ];
  console.log(res);
}).catch(onerror);

co();
// [1, 2];

// Object

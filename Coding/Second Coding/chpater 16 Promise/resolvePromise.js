module.exports = function resolvePromise (promise2, x, resolve, reject) {
  if (promise2 === x) return reject(new TypeError('Chaining cycle detected for promise #<Promise>]'));

  if (typeof x !== 'object' && x!== null || typeof x === 'function') {
    let called;
    try {
      let then =  x.then;
      if (typeof then === 'function') {
        then.call(x, 
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }  
        )
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  }else {
    resolve(x);
  }
}
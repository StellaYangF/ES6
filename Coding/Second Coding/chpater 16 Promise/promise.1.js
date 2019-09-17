const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
// const resolvePromise = require('./resolvePromise');
const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) return reject(new TypeError('Chaining cycle detected for promise #<Promise>]'));

  if ((typeof x === 'object' && x!== null) || typeof x === 'function') {
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

const isPromise = value => {
  if ((typeof value === 'object' && value !== null)|| typeof value === 'function') {
    return typeof value.then === 'function';
  }
  return false;
}

class Promise {
  constructor(executor) {
    debugger;
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = new Set();
    this.onRejectedCallbacks = new Set();

    const resolve = value => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }

      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };

    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.add(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.add(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
    return promise2;
  }

  catch (onRejected) {
    this.then(null, onRejected)
  }

  static resolve(value) {
    return new Promise(resolve => resolve(value));
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    })
  }

  static all (promises) {
    let arr = [];
    let i = 0;

    return new Promise((resolve, reject) => {
      let processData = (index, data) => {
        arr[index] = data;
        if (++i === promises.length) {
          resolve(arr);
        }
      };

      promises.forEach((data, i) => {
        isPromise(data) ? 
          data.then(data => processData(i , data)) :
          processData(i, data);
      })
    })
  }
}

// test
Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((reoslve, reject) => {
    dfd.resolve = reoslve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = Promise;
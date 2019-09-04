const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class Promise {

  constructor (executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.stack = new Set();

    const resolve = value =>  {
      if (this.status === PENDING) {
        this.status = RESOLVED;
        this.value = value;
      }
    }

    const reject = reason =>  {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }
    }

    executor(resolve, reject);
  }

  // instance method
  then (onFulfilled, onRejected) {
    if (this.status === RESOLVED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}

module.exports = Promise;
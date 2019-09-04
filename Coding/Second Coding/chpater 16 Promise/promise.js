const PENDING = 'pending';
const FULFILLED = 'resolved';
const REJECTED = 'rejected';

const resolvePromise = (promise2, x, resolve, reject) => {
    console.log(x, promise2);
    if (promise2 === x) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
}

class Promise {

    constructor(executor) {
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
                [...this.onResolvedCallbacks].forEach(fn => fn());
            }
        }

        const reject = reason => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                [...this.onRejectedCallbacks].forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {

        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(err);
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
                    })
                });
                this.onRejectedCallbacks.add(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    })
                })
            }
        })
        return promise2;
    }
}

module.exports = Promise;
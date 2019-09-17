const PENDING = 'PENDING'; // PENDING = Symbol();
const FULFILLED = 'FULFILLED'; // FULFILLED = Symbol();
const REJECTED = 'REJECTED'; // REJECTED = Symbol();
const resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        // 默认没有调用成功 和 失败
        let called;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                // x.then()  会再次取then的值
                then.call(
                    x,
                    // y => resolve(y),
                    // 如果返回的y又是一个promise,递归实现
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    r => {
                        if (called) return; //防止多次调用
                        called = true;
                        reject(r)
                    }
                )
            } else { // [1,2,3]常量
                resolve(x);
            }
        } catch (error) {
            if (called) return; //防止多次调用
            called = true;
            reject(error); //   取then抛出异常 就报错处理
        }
    } else {
        resolve(x)
    };
}
const isPromise = value => {
    if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
        return typeof value.then === 'function';
    }
    return false;
}


class Promise {
    constructor(executor) {
        // 创建实例时,立即执行
        this.value = undefined;
        this.reason = undefined;
        this.status = PENDING;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        // 定义两个对列：成功，失败
        // 解决resolve没有立即执行的问题
        let resolve = value => {
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED;
                this.onResolvedCallbacks.forEach(fn => fn()); //发布  有可能resolve在then的后面执行，此时先将方法存放起来，到时候成功时再依次执行
            }
        };
        let reject = reason => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };
        // 这里可能会发生异常,同步可以捕获异常
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfiled, onRejected) {
        // arguments are optional
        onFulfiled = typeof onFulfiled === 'function' ? onFulfiled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                // 当前onFulfilled, onRejected不能在当前的上下文中执行，为了确保代码promise2存在；
                setTimeout(() => {
                    try {
                        // console.log(promise2);
                        // new完才能调用
                        let x = onFulfiled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        // console.log(error);
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
            // 发布
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfiled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
                this.onRejectedCallbacks.push(() => {
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
        // 没有成功的then,语法糖
        this.then(null, onRejected)
    }

    try () {
        // 捕获同步异常，异步异常
    }
    
    finally(callback) {
        // 如果返回一个promise，会等待这个promise执行完成
        return this.then(
            value => Promise.resolve(callback()).then(() => value),
            err => Promise.resolve(callback()).then(() => { throw err })
        )
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }

    static all(promises) {
        // 处理异步并发的问题
        let arr = [];
        let i = 0;
        return new Promise((resolve, reject) => {
            let procesData = (index, data) => {
                arr[index] = data;
                if (++i === promises.length)
                    resolve(arr);
            }
            for (let i = 0; i < promises.length; i++) {
                let current = promises[i];
                if (isPromise(current)) {
                    current.then(data => {
                        procesData(i, data)
                    }, reject)
                } else {
                    procesData(i, current)
                }
            }
        })
    }

    static race(promises) {}
}

Promise.deferred = () => {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}

module.exports = Promise;

// 链式调用;
// 测试
// 1) npm install promises-aplus-tests -g
// 2) promises-aplus-tests promise.js
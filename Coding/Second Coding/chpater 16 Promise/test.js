// const Promise = require('./promise.A+.js');

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(new Promise(resolve => resolve('tom')));
        resolve('success');
    }, 1000)
})

let promise2 = p.then(
    () => promise2,
    reason => reason
)

// process.on('unhandledRejection',(err,p) => {
//   throw err;
// })
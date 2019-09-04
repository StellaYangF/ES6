const Promise = require('./promise');

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(new Promise(resolve => resolve('tom')));
        resolve('success');
    }, 1000)
})

let promise2 = p.then(
    value => promise2,
    reason => reason
).then(value => console.log(value), reason => console.log(reason));
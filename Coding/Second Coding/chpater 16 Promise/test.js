const Promise = require('./promise.js');

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(new Promise(resolve => resolve(1111)));
  });
});

p.then(data => console.log(data));
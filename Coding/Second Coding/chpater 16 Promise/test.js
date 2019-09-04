const Promise = require('./promise');

const p = new Promise((resolve, reject)=>{
  setTimeout(()=> {
    console.log('start');
    resolve('resolved');
  }, 1000)
})
p.then(value => console.log(value), reason => console.log(reason))

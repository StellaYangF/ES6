const isPromise = value => {
  if (
    (typeof value === "object" && value !== null) ||
    typeof value === "function"
  ) {
    return typeof promise.then === "function";
  } else return false;
};

// Promise.race = promises => {
//   return new Promise((resolve, reject) => {
//     promises.map(promise => {
//       if (isPromise(promise)) {
//         promise.then(
//           data => {
//             resolve(data);
//           },
//           err => reject(err)
//         );
//       } else {
//         resolve(promise);
//       }
//     });
//   });
// };

new Promise((resolve, reject) => {
  resolve();
});

Promise.race([1, Promise.resolve(2), Promise.reject(3)]).then(
  data => console.log(data),
  err => console.log(err)
);

Promise.prototype.finally = function(f) {
  return this.then(
    value => Promise.resolve(f()).then(() => value),
    err =>
      Promise.resolve(f()).then(() => {
        throw err;
      })
  );
};

Promise.resolve('hello')
  .finally(
    () => console.log('end')
  )
  .then(
    value =>console.log(value)
  )
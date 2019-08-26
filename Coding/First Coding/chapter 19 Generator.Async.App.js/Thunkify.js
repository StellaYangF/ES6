function thunkify(fn) {
  return function() {
    let args = new Array(arguments.length);
    let ctx = this;

    for (let i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function(done) {
      let called;

      args.push(function() {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    };
  };
}

// call
function f(a, b, callback) {
  let sum = a + b;
  callback(sum);
  callback(sum);
}

let ft = thunkify(f);
let print = console.log.bind(console);
ft(1, 2)(print);      // 3



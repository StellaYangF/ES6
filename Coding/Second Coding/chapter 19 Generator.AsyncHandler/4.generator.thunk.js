function run(fn) {
  let gen = fn();

  function next(err = undefined, data = undefined) {
    let result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }
  next();
}

module.exports = run;
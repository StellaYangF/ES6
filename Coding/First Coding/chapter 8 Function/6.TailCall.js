// example explaination
function f(x) {
  return g(x);
}

// three occasions: not belongs to tailcall
function f(x) {
  let y = g(x);
  return y;
}

function f(x) {
  return g(x) + 1;
}

function f(x) {
  g(x);
  // return undefined;
}

// tail call not necessarily located in the tail
function f(x) {
  if (x > 0) {
    return m(x);
  } else {
    return n(x);
  }
}

// call frame will be recorded in innerStorage, which will generate storage waste.

// call stack

// taill call optimization: on condition that inner function does not use outer variables;
function f() {
  let m = 1,
    n = 2;
  return g(m + n);
}
// f()  equals to
function f() {
  return g(3);
}
// equals to
g(3);

// only this, inner function call frame can replace inner call frame.
// otherwise: it won't make sense
function addOne(a) {
  let one = 1;
  function inner(b) {
    return b + one;
  }
  return inner(a);
}
// The above function cannot use tail call optimization

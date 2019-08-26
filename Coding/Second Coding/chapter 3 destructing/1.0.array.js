// Fibonnaci
// 1) iterable
function fib(n) {
  if ( n <=2 ) return 1;
  return fib(n-1) + fib(n-2);
}

// 2) tail call
function fib(n, acc1 = 1, acc2 = 1) {
  if (n <= 2) return acc2;
  return fib(n-1, acc2, acc1 + acc2);
}

// 3) array destructing
function* fib (n) {
  let a = 1;
  let b = 1;

  while(true) {
    yield a;
    [a, b] = [b, a + b]
  }
}
fib(); // generate an iterator
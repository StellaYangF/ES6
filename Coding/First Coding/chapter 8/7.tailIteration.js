// Iteration wastes huge innerStorage since it records thousands of call frames.
// It easily causes stack overflow
// While as for tail iteration, there is only one call frame, it will never cause stack overflow.
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
// This function will record at most n records, complexity: O(n);

// Resolution: optimized
function factorial(n, total=1) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}
factorial(5, 1); //1*5*4*3*2*1

// Fibonacci
function fib(n) {
  if (n <= 1) return 1;
  return fib(n - 2) + fib(n - 1);
}

fib(500); // timeout

// Resolution: optimized
function fib(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) return ac2;
  return fib(n-1, ac2, ac1+ac2);
}
fib(500)



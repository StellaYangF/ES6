// Two famous iteration function
// Factorial
function Factorial(n) {
  if (n === 1) return 1;
  return Factorial(n - 1) * n;
}
function Factorial(n, total = 1) {
  //defaultParams from ES6
  if (n === 1) return 1;
  return Factorial(n - 1, n * total);
}

// Fibonacci
function Fibonacci(n) {
  if (n <= 1) return 1;
  return Fibonacci(n - 2) + Fibonacci(n - 1);
}

function Fibonacci(n, ac1 = 1, ac2 = 1) {
  if (n <= 1) return 1;
  return Fibonacci(n - 1, ac2, ac1 + ac2);
}

// Iteration function revision:
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}
function factorial(n) {
  return tailFactorial(n, 1);
}

//  Currynig： transfer functions obtaining several params into one;
function currying(fn, m) {
  return function(n) {
    return fn.call(this, n, m);
  };
}

function tailFactorial(n, total) {
  if (n === 1) return 1;
  return tailFactorial(n - 1, n * total);
}

let factorial = currying(tailFactorial, 1);
factorial(10);

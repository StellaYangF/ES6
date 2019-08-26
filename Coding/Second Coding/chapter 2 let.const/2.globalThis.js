// method 1:
function getGlobalThis() {
  return typeof window !== "undefined"
    ? window
    : typeof process === "object" &&
      typeof require === "function" &&
      typeof global === "object"
    ? global
    : this;
}


// method 2:
let getGlobal = function () {
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw new Error('unable to locate global object');
}
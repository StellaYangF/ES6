Function.prototype.currying = function () {
  let that = this;
  return function () {
    return Function.prototype.call.apply(that, arguments);
  }
}

function add (a,b) {
  console.log(a+b);
}

add.currying(1,2)
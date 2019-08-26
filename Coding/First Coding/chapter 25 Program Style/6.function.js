// 立即执行函数可以写成箭头函数的形式。

(() => {
  console.log("Welcome to the Internet.");
})();

// 那些使用匿名函数当作参数的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。

// bad
[1, 2, 3, 4].map(function(x) {
  return x * x;
});

// good
[1, 2, 3, 4]
  .map(x => {
    return x * x;
  })

  [
    // best
    (1, 2, 3, 4)
  ].map(x => x * x);

// 箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this。

// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
};

// acceptable
const boundMethod = method.bind(this);

// best
const boundMethod = (...params) => method.apply(this, params);

// 简单的、单行的、不会复用的函数，建议采用箭头函数。
// 如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。

// 所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。

// bad
function divide(a, b, option = false) {}
// good
function divide(a, b, {option = false} = {})

// 不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替。
// 因为 rest 运算符显式表明你想要获取参数，而且 arguments 是一个类似数组的对象，而 rest 运算符可以提供一个真正的数组。

// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}
// good
function concatenateAll(...args){
  return args.join('');
}
// 使用默认值语法设置函数参数的默认值。
// bad
function handleThings(opts) {
  opts = opts || {};
}

// good
function handleThings(opts = {}) {}
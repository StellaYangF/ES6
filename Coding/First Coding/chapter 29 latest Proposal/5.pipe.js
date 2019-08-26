// 管道运算符

// Unix 操作系统有一个管道机制（pipeline），可以把前一个操作的值传给后一个操作。
// 这个机制非常有用，使得简单的操作可以组合成为复杂的操作。
// 许多语言都有管道的实现，现在有一个提案，让 JavaScript 也拥有管道机制。

x >| f;
// equals to
f(x);


// 管道运算符最大的好处，就是可以把嵌套的函数，写成从左到右的链式表达式。

function doubleSay(str) {
  return str + ", "+ str;
}

function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1);
}

function exclaim(str) {
  return str + "!";
}

// traditional method
exclaim(capitalize(doubleSay('hello')));
// 'Hello, hello!'

// pipeline method
'hello'
  >| doubleSay
  >| capitalize
  >| exclaim
// 'Hello, hello!'

// 管道运算符只能传递一个值，这意味着它右边的函数必须是一个单参数函数。
// 如果是多参数函数，就必须进行柯里化，改成单参数的版本。
function double (x) { return x + x;}
function add (x, y) { return x + y;}

let person = { score: 25};

person.score
  >| double
  >| (_ => add(7, _))
  // 57
// 上面代码中，add函数需要两个参数。但是，管道运算符只能传入一个值，因此需要事先提供另一个参数，
// 并将其改成单参数的箭头函数_ => add(7, _)。这个函数里面的下划线并没有特别的含义，
// 可以用其他符号代替，使用下划线只是因为，它能够形象地表示这里是占位符。


// 管道运算符对于await函数也适用。
x >| await f;
// equals to
await f(x);
const userAge = userID >| await fetchUserByID >| getAgeFromUser;
// equals to
const userAge = getAgeFromUser(await fetchUserByID(userID));



// extensible currying thoery
// 维基百科上说道：柯里化，英语：Currying(果然是满满的英译中的既视感)，
// 是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
// 并且返回接受余下的参数而且返回结果的新函数的技术。

// 看这个解释有一点抽象，我们就拿被做了无数次示例的add函数，来做一个简单的实现。


const add = (x, y) => x + y;

// after currying
const curryingAdd = x => y => x + y;

// ES5
const curryingAdd = function (x) {
  return function (y) {
    return x + y;
  }
}

add(1, 3)
curryingAdd(1)(3);

// 来列一列Currying有哪些好处呢？
// 1. 参数复用

RegExp.test('sometest');

// after function wrap
function check(reg, txt) {
  return reg.test(txt);
}

check(/\d+/g, 'test');    //   false
check(/[a-z]+/g, 'test'); // true

// after currying
const curryingCheck = reg => txt => reg.test(txt);

let hasNmber = curryingCheck(/\d+/g);
let hasLetter = curryingCheck(/[a-z]+/g)

hasNmber('test');
hasLetter('test')

// 2. 提前确认
let on =(el, e, cb) => {
  if(document.addEventListener) {
    if(el && e && cb) {
      el.addEventListenere(e, cb, false);
    }
  }else {
    if(el && e && cb) {
      el.attachEvent('on'+e, cb);
    }
  }
}

// curryingCheck
let on = (isSupport = document.addEventListener, el ,e, cb) => {
  if(isSupport) return el.addEventListener(e, cb, false);
  else return el.attachEvent('on'+e, cb);
}

// 我们在做项目的过程中，封装一些dom操作可以说再常见不过，上面第一种写法也是比较常见，
// 但是我们看看第二种写法，它相对一第一种写法就是自执行然后返回一个新的函数，
// 这样其实就是提前确定了会走哪一个方法，避免每次都进行判断。

// 实现一个add方法，使计算结果能够满足如下预期：
add(1)(2)(3) //= 6;
add(1, 2, 3)(4) //= 10;
add(1)(2)(3)(4)(5) //= 15;

const add = (...arr) => {
  const _adder = function() {
    arr.push(...arguments);
    return _adder;
  }
  _adder.toString = () => arr.reduce((a, b) => a + b);
  return _adder;
}



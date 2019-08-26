// 同步遍历器的问题

// 《遍历器》一章说过，Iterator 接口是一种数据遍历的协议，
// 只要调用遍历器对象的next方法，就会得到一个对象，表示当前遍历指针所在的那个位置的信息。
// next方法返回的对象的结构是{value, done}，其中value表示当前的数据的值，done是一个布尔值，表示遍历是否结束。

function idMaker() {
  let index = 0;

  return {
    next() {
      return {
        value: index++,
        done: false
      };
    }
  };
}

const it = idMaker();

it.next().value; // 0
it.next().value; // 1
it.next().value; // 2
// ...

// 上面代码中，变量it是一个遍历器（iterator）。每次调用it.next()方法，就返回一个对象，表示当前遍历位置的信息。

// 这里隐含着一个规定，it.next()方法必须是同步的，只要调用就必须立刻返回值。
// 也就是说，一旦执行it.next()方法，就必须同步地得到value和done这两个属性。
// 如果遍历指针正好指向同步操作，当然没有问题，但对于异步操作，就不太合适了。

function idMaker() {
  let index = 0;

  return {
    next() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ value: index++, done: false });
        }, 1000);
      });
    }
  };
}


// 上面代码中，next()方法返回的是一个 Promise 对象，这样就不行，不符合 Iterator 协议，
// 只要代码里面包含异步操作都不行。也就是说，Iterator 协议里面next()方法只能包含同步操作。

// 目前的解决方法是，将异步操作包装成 Thunk 函数或者 Promise 对象，
// 即next()方法返回值的value属性是一个 Thunk 函数或者 Promise 对象，
// 等待以后返回真正的值，而done属性则还是同步产生的。

function idMaker() {
  let index = 0;

  return {
    next() {
      return {
        value: new Promise(resolve => setTimeout(() => resolve(index++),1000)),
        done: false
      }
    }
  }
}

const it = idMaker();

it.next().value.then(o => console.log(o));//1
it.next().value.then(o => console.log(o));//2
it.next().value.then(o => console.log(o));//3

// 上面代码中，value属性的返回值是一个 Promise 对象，用来放置异步操作。但是这样写很麻烦，不太符合直觉，语义也比较绕。

// ES2018 引入了“异步遍历器”（Async Iterator），为异步操作提供原生的遍历器接口，
// 即value和done这两个属性都是异步产生。


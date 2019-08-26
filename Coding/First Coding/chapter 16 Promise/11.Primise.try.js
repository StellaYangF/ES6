Promise.resolve().then(f)

// example 1: 
const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
// next
// now

// 上面的写法有一个缺点，就是如果f是同步函数，那么它会在本轮事件循环的末尾执行。

// resolution one:
const f = () => console.log("now");
(async () => f())();
console.log("next");
// now next

// if async function
(async () => f())()
  .then()
  .catch()


// resolution two:
const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');
// now  next


// Resolution three: This is just a recommendation not passed
const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now next
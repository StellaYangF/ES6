// Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
const p = Promise.all([p1, p2, p3]);

const databasePromise = connectDatabase();
const booksPromise = databasePromise.then(findAllBooks);

const userPromise = databasePromise.then(getCurrentUser);

Promise.all([booksPromise, userPromise]).then(([books, user]) =>
  pickTopRecommendations(books, user)
);

// 注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。

const p1 = new Promise((resolve, reject) => {
  resolve("hello");
})
  .then(result => result)
  .catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
  .then(result => result)
  .catch(e => e);

Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch( e => console.log(e));

// 如果p2没有自己的catch方法，就会调用Promise.all()的catch方法。

const p1 = new Promise((resolve, reject) => {
  resolve("hello");
})
  .then(result => result);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
  .then(result => result);

Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch( e => console.log(e));
// Error: 报错了

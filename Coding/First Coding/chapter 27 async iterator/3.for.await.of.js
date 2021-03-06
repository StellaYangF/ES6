// 前面介绍过，for...of循环用于遍历同步的 Iterator 接口。
// 新引入的for await...of循环，则是用于遍历异步的 Iterator 接口。
async function f() {
  for await (const x of createAsyncIterable(['a', 'b'])){
    console.log(x);
  }
}
// a
// b


// 上面代码中，createAsyncIterable()返回一个拥有异步遍历器接口的对象，
// for...of循环自动调用这个对象的异步遍历器的next方法，会得到一个 Promise 对象。
// await用来处理这个 Promise 对象，一旦resolve，就把得到的值（x）传入for...of的循环体。

// for await...of循环的一个用途，是部署了 asyncIterable 操作的异步接口，可以直接放入这个循环。

let body = '';
async function f() {
  for await (const data of req) body += data;
  const parsed = JSON.parse(body);
  console.log('got', parsed);
}

// 上面代码中，req是一个 asyncIterable 对象，用来异步读取数据。可以看到，使用for await...of循环以后，代码会非常简洁。

// 如果next方法返回的 Promise 对象被reject，for await...of就会报错，要用try...catch捕捉。

async function f() {
  try{
    for await (const x of createAsyncIterable(['a', 'b'])){
      console.log(x);
    }
  }catch (e) {
    console.error(e);
  }
}

// 注意，for await...of循环也可以用于同步遍历器。
(async function() {
  for await (const x of ['a', 'b']){
    console.log(x);
  }
})();


for(let it of ['a', 'b']){
  console.log(it);
}

// Node v10 支持异步遍历器，Stream 就部署了这个接口。下面是读取文件的传统写法与异步遍历器写法的差异。

async function main(inputFilePath) {
  const readStream = fs.createReadStream(
    inputFilePath,
    { encoding: 'utf8', highWaterMark: 1024 }
  ); 

  for await(const chunk of readStream) {
    console.log('>>> '+chunk);
  }
  console.log('### NODE ###');
}
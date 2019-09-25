// 如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。

async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  });
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// Error：出错了

// 防止出错的方法，也是将其放在try...catch代码块之中。
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
  }
  return await('hello world');
}

// 如果有多个await命令，可以统一放在try...catch结构中。

async function main () {
  try {
    const v1 = await firstSetp();
    const v2 = await secondStep(v1);
    const v3 = await thirdStep(v2);

    console.log("Final: ", v3);
  } catch (error) {
    console.log(error);
  }
}

// 下面的例子使用try...catch结构，实现多次重复尝试。

const superagent = require("superagent");
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i<NUM_RETRIES; i++) {
    try {
      await superagent.get("http://somurl.com");
      break;
    } catch(err) {};
  }
  console.log(i);
}
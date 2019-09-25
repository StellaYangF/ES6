// 借助await让程序停顿指定的时间   进入休眠
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

async function one2FiveInAsync() {
  for (let i = 0; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}

one2FiveInAsync();

// 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。

async function f() {
  await Promise.reject("出错了"); 
  await Promise.resolve("会执行吗?");  // 并不会
}
f().catch(data => console.log(data));

// 解决就算第一个await失败，也不影响后面的执行操作
// （1）
async function f() {
  try {
    await Promise.reject("出错了"); 
  } catch (error) {
    console.log(error);
  }
  return await Promise.resolve("会执行吗?");  
}

f().then(
  data => console.log(data),
  err => console.log(err),
)

// （2）
async function f() {
  await Promise.reject("出错了").catch(err => console.log(err)); 
  return await Promise.resolve("会执行吗?");  
}

f().then(
  data => console.log(data),
  err => console.log(err),
)
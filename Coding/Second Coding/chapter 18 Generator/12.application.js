// （1）异步操作的同步化表达
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScree();
}

function showLoadingScreen() {
  console.log("showLoadingScreen");
}
function loadUIDataAsynchronously() {
  console.log("loadUIDataAsynchronously");
  let result = undefined;
  setTimeout(()=>Promise.resolve("loadUIDataAsynchronously").then(data => result = data ),1000);
  return "result " + result;
}
function hideLoadingScree() {
  console.log("hideLoadingScree");
}
let loader = loadUI();
loader.next();
loader.next();

// Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达
function* main() {
  let result = yield request("http://testurl");
  let resp = JSON.parse(result);
  console.log(resp.value)
}

function request(url) {
  makeAjaxCall(url, response => {
    it.next(response);
  });
}
function makeAjaxCall(url,callback) {
  console.log(url);
  callback("This is response from " + url);
}
let it = main();
it.next();

// Generator函数逐行读取文本文件
function* numbers() {
  let file = new FileReader("./numbers.txt");
  try {
    while (!file.eof) {
      yield parseInt(file.readLine(), 10);
    }
  } finally {
    file.close();
  }
}
let n = numbers();
n.next();

// （2）控制流管理
// 常用的异步操作有：回调函数，promise函数
function* longRunningTask(value1) {
  try {
    let value2 = yield step1(value1);
    let value3 = yield step2(value2);
    let value4 = yield step3(value3);
  } catch(e) {
    console.log(e);
  }
}
// 函数按序自动执行所有步骤
let initalValue = 1;
scheduler(longRunningTask(initalValue));

function scheduler(task) {
  let taskObj = task.next(task.value);   // { value: ..., done: ...}
  if (!taskObj.done) {
    task.value = taskObj.value;
    scheduler(task);
  }
}

// （3）部署 Iterator 接口
// （4）作为数据结构

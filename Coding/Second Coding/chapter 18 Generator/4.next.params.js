const gen = function* () {
  let r1 = yield 1;
  console.log(r1);
  let r2 = yield r1;
};

let g = gen();
g.next();     // 第一次返回值
g.next(2);    // 2作为第一次yield方法的返回值，并传入赋值给r1
g.next();
// {value: 1, done: false}
// {value: 4, done: false}
// {value: undefined, done: true}


// 通过next方法参数，注入值
function* f(x) {
  let y = 2 * (yield (x+ 1));
  let z = yield (y / 3);
  return (x + y + z);
} 

let gen = f(5);    // x: 5
gen.next();   // return 6  
gen.next(12); // return 8, yield return 12, y = 24
gen.next(13); // return 42, yield return 15, z= 13
// {value: 6, done: false}
// {value: 8, done: false}
// {value: 42, done: true}

// 例三：
function* dataConsumer() {
  console.log("Started!");
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return "End!";
}

let gen = dataConsumer();
gen.next();
gen.next("A");
gen.next("B");
/*Print records: */
// "Started!"
// "1. A"
// "2. B"
// "End!"
/* reutrn results: */
// {value: undefined, done: false}
// {value: undefined, done: false}
// {value: "End!", done: true}

// 例四：首次调用就有返回值    函数柯里化
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    // 直接调用一次  输入参数给yield返回值用
    generatorObject.next();
    return generatorObject;
  }
}

const warpped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return "DONE";
})
warpped().next("hello");

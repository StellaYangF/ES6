// 如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。
function* gen () {
  yield "a";
  yield "b";
}
function* bar() {
  yield "x";
  for (let i of gen()) {
    console.log(i);
  };
  yield "y";
}

for (let v of bar()) {
  console.log(v);
}
// x a b y

// yield* 解决深层嵌套的generator function
function* gen () {
  yield "a";
  yield "b";
}

function* bar() {
  yield "x";
  yield* gen();
  yield "y";
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()) {
  console.log(v);
}
// x a b y

// yield*相当于部署一个for...of循环
function* gen() {
  yield* ["a", "b", "c"];
}
for(let val of gen()) {
  console.log(val);
}
// a b c

// 如果yield不加*,则会返回整个数组，加了之后，就调用了for...of循环进一步调用Iterator接口
function* gen() {
  yield ["a", "b", "c"];
}
for(let val of gen()) {
  console.log(val);
}
// [ 'a', 'b', 'c' ]

// 任何部署有Iterator接口的数据结构都能通过yield*遍历
function* gen() {
  yield "helllo";
  yield* "hello";
}
for (let val of gen()) {
  console.log(val);
}
// helllo h e l l o

// 如果被代理的 Generator 函数有return语句，那么就可以向代理它的 Generator 函数返回数据。
function* foo() {
  yield 2;
  yield 3;
  return "foo"; // 被代理使用时，return会直接返回值，不再在next调用返回
}

function* bar() {
  yield 1;
  let val = yield* foo();
  console.log('val: ', val);
  yield 4;
}
let it = bar();
it.next();  // {value: 1, done: false}
it.next();  // {value: 2, done: false}
it.next();  // {value: 3, done: false}
it.next();  // {value: 4, done: false}
it.next();  // {value: undefined, done: true}

// 被代理的generator函数有return返回值
function* foo() {
  yield "a";
  yield "b";
  return "The result is"
}
function* bar() {
  let result = yield* foo();
  console.log(result);
}

[...bar()];
// The result is
// [ "a", "b" ]


// yield*命令可以很方便地取出嵌套数组的所有成员。
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for (let val of tree) {
      yield* iterTree(val);
    } 
  } else {
    yield tree;
  }
}
let tree = ["a", [ "b", [ "c", "d"]], "e"];
[...iterTree(tree)];
// ["a", "b", "c", "d", "e"]

// 遍历完全二叉树
class Tree {
  constructor (left, label, right) {
    this.left = left;
    this.label = label;
    this.right = right;
  }
}
// 中序遍历函数
function* inorder(tree) {
  if (tree) {
    yield* inorder(tree.left);
    yield tree.label;
    yield* inorder(tree.right);
  }
}

// 生成二叉树
function make(array) {
  return array.length == 1 ?
    new Tree(null, array[0], null) :
    new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
let result = [];
for (let node of inorder(tree)) {
  result.push(node);
}
// ["a", "b", "c", "d", "e", "f", "g"]
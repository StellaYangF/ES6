// yield表达式与return语句既有相似之处，也有区别。相似之处在于，都能返回紧跟在语句后面的那个表达式的值。区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，而return语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）return语句，但是可以执行多次（或者说多个）yield表达式。正常函数只能返回一个值，因为只能执行一次return；Generator 函数可以返回一系列的值，因为可以有任意多个yield。从另一个角度看，也可以说 Generator 生成了一系列的值，这也就是它的名称的来历（英语中，generator 这个词是“生成器”的意思）。


// Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。

function* f() {
  console.log("Performed!");
}

// 1） 调用f()并进行赋值时，f()不会执行，因其实Generator函数
let gen = f();

// 2） 只有调用其返回的对象的.next方法时，f()才会执行
setTimeout(()=>{
  gen.next()
},2000)
// Performed!
// { value: undefined, done: true }

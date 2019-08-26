// 字符串是一个类似数组的对象，也原生具有 Iterator 接口。

let str = "hi";
typeof str[Symbol.iterator];

let it = str[Symbol.iterator]();
iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }

// 上面代码中，调用Symbol.iterator方法返回一个遍历器对象，在这个遍历器上可以调用 next 方法，实现对于字符串的遍历。

// 可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的。

let str = new String("hi");
[...str];     // ["h", "i"]

str[Symbol.iterator] = function(){
  return {
    next: function(){
      if(this._first){
        this._first = false;
        return { value:"bye", done:false};
      }else{
        return {done : true};
      }
    },
    _first: true
  }
}


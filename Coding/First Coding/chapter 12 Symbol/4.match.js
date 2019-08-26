String.prototype.match(regexp);
// 等同于
regexp[Symbol.match](this);

class MyMatcher{
  [Symbol.match](string){
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher());     //1


String.prototype.replace(seachvalue, replaceValue);
// equals to
seachvalue[Symbol.replace] (this, replaceValue);

const x = {};
x[Symbol.replace] = (...s)=> {
  console.log(s);
}
"hello".replace(x, 'world')
// ["hello", "world"]
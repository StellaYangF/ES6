// 使用扩展运算符（...）拷贝数组。
// bad
const len = items.length;
const itemsCopy = [];
let i ; 
for(i = 0; i <length; i++){
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];

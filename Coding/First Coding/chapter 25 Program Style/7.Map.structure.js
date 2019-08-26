// Map 结构

// 注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。
// 如果只是需要key: value的数据结构，使用 Map 结构。
// 因为 Map 有内建的遍历机制。

let map = new Map(arr);
for(let key of map.keys()) {
  console.log(key);
}

for(let value of map.values()){
  console.log(values);
}

for(let [key, value] of map.entries()) {
  console.log(`${key}: ${value}`);
}


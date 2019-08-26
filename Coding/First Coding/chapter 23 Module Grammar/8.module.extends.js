// 模块之间也可以继承。

// 假设有一个circleplus模块，继承了circle模块。

// circleplus.js
export * from 'circle';
export var e = 2.71545454545;
export default function(x) {
  return Math.exp(x);
}

// 上面代码中的import exp表示，将circleplus模块的默认方法加载为exp方法。


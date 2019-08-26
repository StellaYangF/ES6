// 目前，Babel 转码器已经支持 Decorator。

// 首先，安装@babel/core和@babel/plugin-proposal-decorators。
// 由于后者包括在@babel/preset-stage-0之中，所以改为安装@babel/preset-stage-0亦可。

// $ npm install @babel/core @babel/plugin-proposal-decorators

{
  "plugins": ["@babel/plugin-proposal-decorators"]
}
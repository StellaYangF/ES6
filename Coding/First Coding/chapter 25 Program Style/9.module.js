// 首先，Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。使用import取代require。

// bad 
const moduleA = require('moduleA');
const f1 = moduleA.fl;
const f2 = moduleA.f2;

// good
import {f1, f2} from 'moduleA';


// 使用export取代module.exports。

// commonJS style
var React = require('react');

var Breadcrumbs = React.createClass({
  render() {
    return <nav />;
  }
});

module.exports = Breadcrumbs;

// ES  6
import React from 'react';
class Breadcrumbs extends React.Component {
  render() {
    return <nav />
  }
}

export default Breadcrumbs;

// 如果模块只有一个输出值，就使用export default，如果模块有多个输出值，就不使用export default，
// export default与普通的export不要同时使用。

// 不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）。

// bad
import * as myObject from './importModule';

// good
import myObject from './importModule';

// 如果模块默认输出一个函数，函数名的首字母应该小写。

function makeStyleGuide (){}

export default makeStyleGuide;

// 如果模块默认输出一个对象，对象名的首字母应该大写。

const SytleGuide = {
  es6: {}
}
export default SytleGuide;


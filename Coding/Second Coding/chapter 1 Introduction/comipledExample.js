"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// es6 grammar
var Person =
/*#__PURE__*/
function () {
  function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
  } // say() {
  //   return function hello (){
  //     console.log(this);    // undefined   callback.this refers to window/ undefined   
  //     console.log(this.name);
  //   }
  // }


  _createClass(Person, [{
    key: "say",
    value: function say() {
      var _this = this;

      return function () {
        console.log(_this.name); // default returns undefined
      };
    }
  }]);

  return Person;
}();

var p = new Person('Tom');
p.say()(); // comiple es6
// 1) npx babel file.js
// 2) npx babel example.js --out-file compiled.js
//    short-cut: npx babel example.js -o compiled.js
// 3) npx bable dir --out-dir lib
//    short-cut: npx babel dir -d lib (-s)

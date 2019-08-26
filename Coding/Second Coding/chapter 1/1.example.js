// es6 grammar
class Person {
  constructor (name) {
    this.name = name;
  }

  // say() {
  //   return function hello (){
  //     console.log(this);    // undefined   callback.this refers to window/ undefined   
  //     console.log(this.name);
  //   }
  // }

  say() {
    return () => {
      console.log(this.name);
      // default returns undefined
    }
  }
}

let p = new Person('Tom');
p.say()();

// comiple es6
// 1) npx babel file.js
// 2) npx babel example.js --out-file compiled.js
//    short-cut: npx babel example.js -o compiled.js
// 3) npx bable dir --out-dir lib
//    short-cut: npx babel dir -d lib (-s)

module.exports = Person;
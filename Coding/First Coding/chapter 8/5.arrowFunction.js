// function Timer(){
//   this.s1 = 0;
//   this.s2 = 0;
//   setInterval(()=>this.s1++, 1000);//Here 'this' refers to Timer
//   setInterval(function(){
//     this.s2++;  // Here 'this' refers to 
//   },1000)
// }

// var timer = new Timer();
// setTimeout(()=>{ console.log("s1", timer.s1)}, 3100);
// setTimeout(()=>{ console.log("s2", timer.s2)}, 3100);

// // defined: arrowFunction has no this, so inside the arrowFunction this refers to its outside funtion scope.
// // operate: While inside the normal function , this refers to window.
// let handler = {
//   id : "123456",
   
//   init(){
//     document.addEventListener('click',
//     event => this.doSomething(event.type),false);
//   },

//   doSomething(type){
//     console.log("Handling" + type + 'for' + this.id);
//   }
// }

// // ES5
// function foo(){
//   let _this = this;
//   setTimeout(function() {
//     console.log("id",_this.id);
//   }, 100);
// }
// // ES6
// function foo(){
//   setTimeout(() => {
//     console.log("id",this.id);
//   }, 100);
// }

// // ES6 arrowFunction:has no this, arguments, super, new.target
// function foo(){
//   setTimeout(() => {
//     console.log('arg: ',arguments);     
//   }, 100);
// }

// foo(1,2,3,4,5,6)//    arguments: [1,2,3,4,5,6]


// // Tips: 
// // Since arrow function has no this, .call(), .apply(), .bind() are unavailable
// (function(){
//   return [
//     ( () => this.x).bind({ x: 'inner' })()
//   ];
// }).call({ x: 'outer'});
// // arrow function bind this to solve the complex problem;

// //occasions that arrowFunction cannot be used: since 'this' refers to static status from dynamic status
// /****  one: in object's method, and it includes its this ****/
// let cat = {
//   lives: 9,
//   jumps:()=>{
//     this.lives --;      // here 'this' refers to window, because object does not form scope.
//   }
// }
// cat.jumps();      // generally an object's methods inside this refers to the object, but here 
// // arrow function's this is just effective when it's defined


// // The right one:
// cat = {
//   lives: 9,
//   jumps(){ this.lives--;}
// }
// // OR
// cat = {
//   lives: 9,
//   jumps: function(){ 
//     this.lives --;
//   }
// }

// // Arrow function is not recommended when this are many lines or read/ write operations 
// // in order to improve the readability of codes;


// // nested arrowFunction
// function foo(value){
//   return {into: function (array){
//     return {after: function (afterValue){
//       array.splice(array.indexOf(afterValue) +1, 0, value);
//       return array;
//     }}
//   }}
// }

// pipline 部署管道机制
const pipeline = (...funcs) =>
  val => funcs.reduce(( prev, fun) => fun(prev), val);
const plus1 = a => a+1;
const mult2 = a => a*2;

const addThenMult = pipeline(plus1, mult2);
addThenMult(5);     // 12
// first return 5+1 = 6
// second return 6*2 = 12



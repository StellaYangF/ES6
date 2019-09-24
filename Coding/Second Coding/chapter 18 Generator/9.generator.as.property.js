// 对象属性简写方式
let obj = {
  * gen() {
    /*...*/
  }
}
// complete version
let obj = {
  gen: function* () {
    /*...*/
  }
}
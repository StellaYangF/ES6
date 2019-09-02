
/***************************Example 1 *********************************************/
const handler = {
  construct (target, args) {
    console.log(args);
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10};
  }
};

const p = new Proxy(function () {},handler);
(new p(1)).value;   
// called: 1
// 10

/*******************************Example 2 *****************************************/
// 返回必须是对象，否则报错
const p = new Proxy(function () {}, {
  construct (target, args) {
    return 1;
  }
})
new p();
// Uncaught TypeError: 'construct' on proxy: trap returned non-object ('1')
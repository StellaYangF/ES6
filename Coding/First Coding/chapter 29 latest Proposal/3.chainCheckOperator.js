// 链判断运算符
// 编程实务中，如果读取对象内部的某个属性，往往需要判断一下该对象是否存在。
// 比如，要读取message.body.user.firstName，安全的写法是写成下面这样。

const firstName =
  (message &&
    message.body &&
    message.body.user &&
    message.body.user.firstName) ||
  "default";

// 这样的层层判断非常麻烦，因此现在有一个提案，引入了“链判断运算符”（optional chaining operator）?.，简化上面的写法。
const firstName = message?.body?.user?.firstName || "default";

// 链判断运算符号有三种用法。
/* 
    obj?.prop // 读取对象属性
    obj?.[expr] // 同上
    func?.(...args) // 函数或对象方法的调用
*/ 


// 抽象操作的标准流程

// 抽象操作的运行流程，一般是下面这样。

/*  
  Let resultCompletionRecord be AbstractOp().
  If resultCompletionRecord is an abrupt completion, return resultCompletionRecord.
  Let result be resultCompletionRecord.[[Value]].
  return result.
*/

// 上面的第一步是调用抽象操作AbstractOp()，得到resultCompletionRecord，这是一个 Completion Record。第二步，如果这个 Record 属于 abrupt completion，就将resultCompletionRecord返回给用户。如果此处没有返回，就表示运行结果正常，所得的值存放在resultCompletionRecord.[[Value]]属性。第三步，将这个值记为result。第四步，将result返回给用户。

// ES6 规格将这个标准流程，使用简写的方式表达。

// Let result be AbstractOp().
// ReturnIfAbrupt(result).
// return result.
// 这个简写方式里面的ReturnIfAbrupt(result)，就代表了上面的第二步和第三步，即如果有报错，就返回错误，否则取出值。

// 甚至还有进一步的简写格式。

// Let result be ? AbstractOp().
// return result.
// 上面流程的?，就代表AbstractOp()可能会报错。一旦报错，就返回错误，否则取出值。

// 除了?，ES 6 规格还使用另一个简写符号!。

// Let result be ! AbstractOp().
// return result.
// 上面流程的!，代表AbstractOp()不会报错，返回的一定是 normal completion，总是可以取出值。


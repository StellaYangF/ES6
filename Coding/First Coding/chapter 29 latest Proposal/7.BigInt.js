// JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。
// 一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，
// JavaScript 是无法精确表示的，这使得 JavaScript 不适合进行科学和金融方面的精确计算。
// 二是大于或等于2的1024次方的数值，JavaScript 无法表示，会返回Infinity。

1024 === 32 * 32;     // true
Math.pow(2, 10) === 2 ** 10;

// 超过 53 个二进制位的数值，无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

// 超过 2 的 1024 次方的数值，无法表示
Math.pow(2, 1024) // Infinity

// 现在有一个提案，引入了一种新的数据类型 BigInt（大整数），来解决这个问题。
// BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。

const a = 2172141653n;
const b = 15346349309n;

// BigInt 可以保持精度
a * b // 33334444555566667777n

// 普通整数无法保持精度
Number(a) * Number(b) // 33334444555566670000

// 为了与 Number 类型区别，BigInt 类型的数据必须添加后缀n。
1234 // normal int
1234n // BigInt

// BigInt operation

1n + 2n //3n

// BigInt 同样可以使用各种进制表示，都要加上后缀n。
0b1101n //  binary
0o777n  // eightary
0xFFn // sixary

// BigInt 与普通整数是两种值，它们之间并不相等。

42n === 42 // false

// typeof运算符对于 BigInt 类型的数据返回bigint。

typeof 123n // 'bigint'

// BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突。

-42n // 正确
+42n // 报错
// Uncaught TypeError: Cannot convert a BigInt value to a number


// JavaScript 原生提供BigInt对象，可以用作构造函数生成 BigInt 类型的数值。
// 转换规则基本与Number()一致，将其他类型的值转为 BigInt。

BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n

// BigInt()构造函数【必须有参数】，而且参数必须可以正常转为【数值】，下面的用法都会报错。
new BigInt() // TypeError
BigInt(undefined) //TypeError
BigInt(null) // TypeError
BigInt('123n') // SyntaxError
BigInt('abc') // SyntaxError

// 上面代码中，尤其值得注意字符串123n无法解析成 Number 类型，所以会报错。

// 参数如果是小数，也会报错。

BigInt(1.5) // RangeError
BigInt('1.5') // SyntaxError


// 转换规则
// 可以使用Boolean()、Number()和String()这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型。

Boolean(0n) // false
Boolean(1n) // true
Number(1n)  // 1
String(1n)  // "1"

// 上面代码中，注意最后一个例子，转为字符串时后缀n会消失。
// 另外，取反运算符（!）也可以将 BigInt 转为布尔值。
!0n // true
!1n // false


// 数学运算
// 数学运算方面，BigInt 类型的+、-、*和**这四个二元运算符，与 Number 类型的行为一致。
// 除法运算/会舍去小数部分，返回一个整数。

9n / 5n   // 1n

// 几乎所有的数值运算符都可以用在 BigInt，但是有两个例外。

// 不带符号的右移位运算符>>>
// 一元的求正运算符+
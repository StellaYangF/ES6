// ArrayBuffer对象作为内存区域，可以存放多种类型的数据。
// 同一段内存，不同数据有不同的解读方式，这就叫做“视图”（view）。
// ArrayBuffer有两种视图，一种是TypedArray视图，另一种是DataView视图。
// 前者的数组成员都是同一个数据类型，
// 后者的数组成员可以是不同的数据类型。

// 目前，TypedArray视图一共包括 9 种类型，每一种视图都是一种构造函数。

/* 
    Int8Array：8 位有符号整数，长度 1 个字节。
    Uint8Array：8 位无符号整数，长度 1 个字节。
    Uint8ClampedArray：8 位无符号整数，长度 1 个字节，溢出处理不同。
    Int16Array：16 位有符号整数，长度 2 个字节。
    Uint16Array：16 位无符号整数，长度 2 个字节。
    Int32Array：32 位有符号整数，长度 4 个字节。
    Uint32Array：32 位无符号整数，长度 4 个字节。
    Float32Array：32 位浮点数，长度 4 个字节。
    Float64Array：64 位浮点数，长度 8 个字节。
*/ 

// 这 9 个构造函数生成的数组，统称为TypedArray视图。
// 它们很像普通数组，都有length属性，都能用方括号运算符（[]）获取单个元素，所有数组的方法，在它们上面都能使用。
// 普通数组与 TypedArray 数组的差异主要在以下方面。

// TypedArray 数组只是一层视图，本身不储存数据，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。

// 构造函数有多种用法。

// （1）TypedArray(buffer, byteOffset=0, length?)

const b = new ArrayBuffer(8);
// 创建一个8字节的ArrayBuffer

const v1 = new Int32Array(b);
// 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾

const v2 = new Uint8Array(b, 2);
// 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾

const v3 = new Int16Array(b, 2, 2);
// 创建一个指向b的Int16视图，开始于字节2，长度为2

// 上面代码在一段长度为 8 个字节的内存（b）之上，生成了三个视图：v1、v2和v3。

// 注意，byteOffset必须与所要建立的数据类型一致，否则会报错。

const buffer = new ArrayBuffer(8);
const i16 = new Int16Array(buffer, 1);
// Uncaught RangeError: start offset of Int16Array should be a multiple of 2

// 上面代码中，新生成一个 8 个字节的ArrayBuffer对象，然后在这个对象的第一个字节，
// 建立带符号的 16 位整数视图，结果报错。
// 因为，带符号的 16 位整数需要两个字节，所以byteOffset参数必须能够被 2 整除。

// 如果想从任意字节开始解读ArrayBuffer对象，必须使用DataView视图，因为TypedArray视图只提供 9 种固定的解读格式。

// （2）TypedArray(length)

// 视图还可以不通过ArrayBuffer对象，直接分配内存而生成。

const f64a = new Float64Array(8);
f64a[0] = 10;
f64a[1] = 20;
f64a[2] = f64a[0] + f64a[1];
// 上面代码生成一个 8 个成员的Float64Array数组（共 64 字节），然后依次对每个成员赋值。
// 这时，视图构造函数的参数就是成员的个数。可以看到，视图数组的赋值操作与普通数组的操作毫无两样。

// （3）TypedArray(typedArray)

// TypedArray 数组的构造函数，可以接受另一个TypedArray实例作为参数。

const typedArray = new Int8Array(new Uint8Array(4));

// 上面代码中，Int8Array构造函数接受一个Uint8Array实例作为参数。

// 注意，此时生成的新数组，只是复制了参数数组的值，对应的底层内存是不一样的。
// 新数组会开辟一段新的内存储存数据，不会在原数组的内存之上建立视图。

const x = new Int8Array([1, 1]);
const y = new Int8Array(x);
x[0] // 1
y[0] // 1

x[0] = 2;
y[0] // 1

// 上面代码中，数组y是以数组x为模板而生成的，当x变动的时候，y并没有变动。

// 如果想基于同一段内存，构造不同的视图，可以采用下面的写法。

const x = new Int8Array([1, 1]);
const y = new Int8Array(x.buffer);
x[0] // 1
y[0] // 1

x[0] = 2;
y[0] // 2

// （4）TypedArray(arrayLikeObject)

// 构造函数的参数也可以是一个普通数组，然后直接生成TypedArray实例。

const typedArray = new Uint8Array([1, 2, 3, 4]);
// 注意，这时TypedArray视图会重新开辟内存，不会在原数组的内存上建立视图。

// 上面代码从一个普通的数组，生成一个 8 位无符号整数的TypedArray实例。

// TypedArray 数组也可以转换回普通数组。

const normalArray = [...typedArray];
// or
const normalArray = Array.from(typedArray);
// or
const normalArray = Array.prototype.slice.call(typedArray);

// 数组方法
// 普通数组的操作方法和属性，对 TypedArray 数组完全适用。

/* 
  TypedArray.prototype.copyWithin(target, start[, end = this.length])
  TypedArray.prototype.entries()
  TypedArray.prototype.every(callbackfn, thisArg?)
  TypedArray.prototype.fill(value, start=0, end=this.length)
  TypedArray.prototype.filter(callbackfn, thisArg?)
  TypedArray.prototype.find(predicate, thisArg?)
  TypedArray.prototype.findIndex(predicate, thisArg?)
  TypedArray.prototype.forEach(callbackfn, thisArg?)
  TypedArray.prototype.indexOf(searchElement, fromIndex=0)
  TypedArray.prototype.join(separator)
  TypedArray.prototype.keys()
  TypedArray.prototype.lastIndexOf(searchElement, fromIndex?)
  TypedArray.prototype.map(callbackfn, thisArg?)
  TypedArray.prototype.reduce(callbackfn, initialValue?)
  TypedArray.prototype.reduceRight(callbackfn, initialValue?)
  TypedArray.prototype.reverse()
  TypedArray.prototype.slice(start=0, end=this.length)
  TypedArray.prototype.some(callbackfn, thisArg?)
  TypedArray.prototype.sort(comparefn)
  TypedArray.prototype.toLocaleString(reserved1?, reserved2?)
  TypedArray.prototype.toString()
  TypedArray.prototype.values()
*/ 

// 上面所有方法的用法，请参阅数组方法的介绍，这里不再重复了。

// 注意，TypedArray 数组没有concat方法。如果想要合并多个 TypedArray 数组，可以用下面这个函数。

function concatenate(resultConstructor, ...arrays) {
  let totalLength = 0;
  for (let arr of arrays) {
    totalLength += arr.length;
  }
  let result = new resultConstructor(totalLength);
  let offset = 0;
  for (let arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

concatenate(Uint8Array, Uint8Array.of(1, 2), Uint8Array.of(3, 4));

// 另外，TypedArray 数组与普通数组一样，部署了 Iterator 接口，所以可以被遍历。

let ui8 = Uint8Array.of(0, 1, 2);
for( let byte of ui8) {
  console.log(byte);
}

// 0
// 1
// 2

// 字节序
// 字节序指的是数值在内存中的表示方式。

const buffer = new ArrayBuffer(16);
const int32View = new Int32Array(buffer);

for(let i =0; i < int32View.length; i++){
  int32View[i] = i*2;
}

// 上面代码生成一个 16 字节的ArrayBuffer对象，然后在它的基础上，建立了一个 32 位整数的视图。
// 由于每个 32 位整数占据 4 个字节，所以一共可以写入 4 个整数，依次为 0，2，4，6。

// 如果在这段数据上接着建立一个 16 位整数的视图，则可以读出完全不一样的结果。

const int16View = new Int16Array(buffer);

for(let i =0; i < int16View.length; i++) {
  console.log('Entry ' + i + ': ' + int16View[i]);
}
// Entry 0: 0
// Entry 1: 0
// Entry 2: 2
// Entry 3: 0
// Entry 4: 4
// Entry 5: 0
// Entry 6: 6
// Entry 7: 0

// 由于每个 16 位整数占据 2 个字节，所以整个ArrayBuffer对象现在分成 8 段。
// 然后，由于 x86 体系的计算机都采用小端字节序（little endian），相对重要的字节排在后面的内存地址，
// 相对不重要字节排在前面的内存地址，所以就得到了上面的结果。

// 比如，一个占据四个字节的 16 进制数0x12345678，决定其大小的最重要的字节是“12”，最不重要的是“78”。
// 小端字节序将最不重要的字节排在前面，储存顺序就是78563412；
// 大端字节序则完全相反，将最重要的字节排在前面，储存顺序就是12345678。
// 目前，所有个人电脑几乎都是小端字节序，所以 TypedArray 数组内部也采用小端字节序读写数据，
// 或者更准确的说，按照本机操作系统设定的字节序读写数据。

// 这并不意味大端字节序不重要，事实上，很多网络设备和特定的操作系统采用的是大端字节序。
// 这就带来一个严重的问题：如果一段数据是大端字节序，TypedArray 数组将无法正确解析，
// 因为它只能处理小端字节序！为了解决这个问题，JavaScript 引入DataView对象，
// 可以设定字节序，下文会详细介绍。

// 下面是另一个例子。
// 假定某段buffer包含如下字节 [0x02, 0x01, 0x03, 0x07]
const buffer = new ArrayBuffer(4);
const v1 = new Uint8Array(buffer);
v1[0] = 2;
v1[1] = 1;
v1[2] = 3;
v1[3] = 7;

const uInt16View = new Uint16Array(buffer);

// 计算机采用小端字节序
// 所以头两个字节等于258
if (uInt16View[0] === 258) {
  console.log('OK'); // "OK"
}

// 赋值运算
uInt16View[0] = 255;    // 字节变为[0xFF, 0x00, 0x03, 0x07]
uInt16View[0] = 0xff05; // 字节变为[0x05, 0xFF, 0x03, 0x07]
uInt16View[1] = 0x0210; // 字节变为[0x05, 0xFF, 0x10, 0x02]


// BYTES_PER_ELEMENT 属性
// 每一种视图的构造函数，都有一个BYTES_PER_ELEMENT属性，表示这种数据类型占据的字节数。

Int8Array.BYTES_PER_ELEMENT // 1
Uint8Array.BYTES_PER_ELEMENT // 1
Uint8ClampedArray.BYTES_PER_ELEMENT // 1
Int16Array.BYTES_PER_ELEMENT // 2
Uint16Array.BYTES_PER_ELEMENT // 2
Int32Array.BYTES_PER_ELEMENT // 4
Uint32Array.BYTES_PER_ELEMENT // 4
Float32Array.BYTES_PER_ELEMENT // 4
Float64Array.BYTES_PER_ELEMENT // 8

// 这个属性在TypedArray实例上也能获取，即有TypedArray.prototype.BYTES_PER_ELEMENT。

// ArrayBuffer 与字符串的互相转换
// ArrayBuffer 和字符串的相互转换，使用原生 TextEncoder 和 TextDecoder 方法。
// 为了便于说明用法，下面的代码都按照 TypeScript 的用法，给出了类型签名。

/**
 * Convert ArrayBuffer/TypedArray to String via TextDecoder
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
 */
function ab2str(
  input: ArrayBuffer | Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array,
  outputEncoding: string = 'utf8',
): string {
  const decoder = new TextDecoder(outputEncoding)
  return decoder.decode(input)
}

/**
 * Convert String to ArrayBuffer via TextEncoder
 *
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/TextEncoder
 */
function str2ab(input: string): ArrayBuffer {
  const view = str2Uint8Array(input)
  return view.buffer
}

/** Convert String to Uint8Array */
function str2Uint8Array(input: string): Uint8Array {
  const encoder = new TextEncoder()
  const view = encoder.encode(input)
  return view
}

// 上面代码中，ab2str()的第二个参数outputEncoding给出了输出编码的编码，
// 一般保持默认值（utf-8），其他可选值参见官方文档或 Node.js 文档。

// 溢出 
// 不同的视图类型，所能容纳的数值范围是确定的。
// 超出这个范围，就会出现溢出。比如，8 位视图只能容纳一个 8 位的二进制值，
// 如果放入一个 9 位的值，就会溢出。

// TypedArray 数组的溢出处理规则，简单来说，就是抛弃溢出的位，然后按照视图类型进行解释。

const uint8 = new Uint8Array(1);

uint8[0] = 256;
uint8[0] // 0

uint8[0] = -1;
uint8[0] // 255

// 上面代码中，uint8是一个 8 位视图，而 256 的二进制形式是一个 9 位的值100000000，这时就会发生溢出。
// 根据规则，只会保留后 8 位，即00000000。uint8视图的解释规则是无符号的 8 位整数，所以00000000就是0。

// 负数在计算机内部采用“2 的补码”表示，也就是说，将对应的正数值进行否运算，然后加1。
// 比如，-1对应的正值是1，进行否运算以后，得到11111110，再加上1就是补码形式11111111。
// uint8按照无符号的 8 位整数解释11111111，返回结果就是255。

// 一个简单转换规则，可以这样表示。

/* 
  正向溢出（overflow）：当输入值大于当前数据类型的最大值，结果等于当前数据类型的最小值加上余值，再减去 1。
  负向溢出（underflow）：当输入值小于当前数据类型的最小值，结果等于当前数据类型的最大值减去余值的绝对值，再加上 1。
*/ 

// 上面的“余值”就是模运算的结果，即 JavaScript 里面的%运算符的结果。


12 % 4 // 0
12 % 5 // 2
// 上面代码中，12 除以 4 是没有余值的，而除以 5 会得到余值 2。

// 请看下面的例子。
const int8 = new Int8Array(1);

int8[0] = 128;
int8[0] // -128

int8[0] = -129;
int8[0] // 127
// 上面例子中，int8是一个带符号的 8 位整数视图，它的最大值是 127，最小值是-128。
// 输入值为128时，相当于正向溢出1，根据“最小值加上余值（128 除以 127 的余值是 1），
// 再减去 1”的规则，就会返回-128；输入值为-129时，相当于负向溢出1，
// 根据“最大值减去余值的绝对值（-129 除以-128 的余值的绝对值是 1），再加上 1”的规则，就会返回127。

// Uint8ClampedArray视图的溢出规则，与上面的规则不同。
// 它规定，凡是发生正向溢出，该值一律等于当前数据类型的最大值，即 255；
// 如果发生负向溢出，该值一律等于当前数据类型的最小值，即 0。

const uint8c = new Uint8ClampedArray(1);
uint8c[0] = 256;
uint8c[0] // 255

uint8c[0] = -1;
uint8c[0] // 0
// 上面例子中，uint8C是一个Uint8ClampedArray视图，正向溢出时都返回 255，负向溢出都返回 0。

// TypedArray.prototype.buffer § ⇧
// TypedArray实例的buffer属性，返回整段内存区域对应的ArrayBuffer对象。该属性为只读属性。

const a = new Float32Array(64);
const b = new Uint8Array(a.buffer);
// 上面代码的a视图对象和b视图对象，对应同一个ArrayBuffer对象，即同一段内存。

TypedArray.prototype.byteLength
TypedArray.prototype.byteOffset 

const b = new ArrayBuffer(8);

const v1 = new Int32Array(b);
const v2 = new Uint8Array(b, 2);
const v3 = new Int16Array(b, 2, 2);
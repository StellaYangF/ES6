// WebGL: Web Graphics Library

// 二进制数组由三类对象组成。

// （1）ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。
// “视图”部署了数组接口，这意味着，可以用数组的方法操作内存。

// （2）TypedArray视图：共包括 9 种类型的视图，比如Uint8Array（无符号 8 位整数）数组视图,
// Int16Array（16 位整数）数组视图, Float32Array（32 位浮点数）数组视图等等。

// （3）DataView视图：可以自定义复合格式的视图，
// 比如第一个字节是 Uint8（无符号 8 位整数）、第二、三个字节是 Int16（16 位整数）、第四个字节开始是 Float32（32 位浮点数）等等，
// 此外还可以自定义字节序。

// 简单说，ArrayBuffer对象代表原始的二进制数据，T
// ypedArray视图用来读写简单类型的二进制数据，
// DataView视图用来读写复杂类型的二进制数据。

// TypedArray视图支持的数据类型一共有 9 种（DataView视图支持除Uint8C以外的其他 8 种）。

// 注意，二进制数组并不是真正的数组，而是类似数组的对象。

// 很多浏览器操作的 API，用到了二进制数组操作二进制数据，下面是其中的几个。

/* 
  Canvas
  Fetch API
  File API
  WebSockets
  XMLHttpRequest
*/

// ArrayBuffer 对象

// 概述

// ArrayBuffer对象代表储存二进制数据的一段内存，它不能直接读写，
// 只能通过视图（TypedArray视图和DataView视图)来读写，视图的作用是以指定格式解读二进制数据。

// ArrayBuffer也是一个构造函数，可以分配一段可以存放数据的连续内存区域。

const buf = new ArrayBuffer(32);

// 上面代码生成了一段 32 字节的内存区域，每个字节的值默认都是 0。
// 可以看到，ArrayBuffer构造函数的参数是所需要的内存大小（单位字节）。

// 为了读写这段内容，需要为它指定视图。DataView视图的创建，需要提供ArrayBuffer对象实例作为参数。

const dataView = new DataView(buf);
dataView.getUint8(0); // 0

// 上面代码对一段 32 字节的内存，建立DataView视图，然后以不带符号的 8 位整数格式，
// 从头读取 8 位二进制数据，结果得到 0，因为原始内存的ArrayBuffer对象，默认所有位都是 0。

// 另一种TypedArray视图，与DataView视图的一个区别是，它不是一个构造函数，而是一组构造函数，代表不同的数据格式。

const buffer = new ArrayBuffer(12);

const x1 = new Int32Array(buffer);
x1[0] = 1;
const x2 = new Uint8Array(buffer);
x2[0] = 2;

x1[0];
// 2

// 上面代码对同一段内存，分别建立两种视图：32 位带符号整数（Int32Array构造函数）和 8 位不带符号整数（Uint8Array构造函数）。
// 由于两个视图对应的是同一段内存，一个视图修改底层内存，会影响到另一个视图。

// TypedArray视图的构造函数，除了接受ArrayBuffer实例作为参数，
// 还可以接受普通数组作为参数，直接分配内存生成底层的ArrayBuffer实例，
// 并同时完成对这段内存的赋值。

const typedArray = new Uint8Array([0, 1, 2]);

typedArray.length;
// 3
typedArray[0] = 5;
typedArray;
//[ 5, 1, 2];

// 上面代码使用TypedArray视图的Uint8Array构造函数，新建一个不带符号的 8 位整数视图。
// 可以看到，Uint8Array直接使用普通数组作为参数，对底层内存的赋值同时完成。

// （1） ArrayBuffer.prototype.byteLength § ⇧

// ArrayBuffer实例的byteLength属性，返回所分配的内存区域的字节长度。

const buffer = new ArrayBuffer(32);
buffer.byteLength;
// 32

// 如果要分配的内存区域很大，有可能分配失败（因为没有那么多的连续空余内存），所以有必要检查是否分配成功。

if (buffer.byteLength === n) {
  // success
} else {
  // fail
}

// （2） ArrayBuffer.prototype.slice()
// ArrayBuffer实例有一个slice方法，允许将内存区域的一部分，拷贝生成一个新的ArrayBuffer对象。

const buffer = new ArrayBuffer(8);
const newBuffer = buffer.slice(0, 3);

// 上面代码拷贝buffer对象的前 3 个字节（从 0 开始，到第 3 个字节前面结束），生成一个新的ArrayBuffer对象。
// slice方法其实包含两步，
// 第一步是先分配一段新内存，
// 第二步是将原来那个ArrayBuffer对象拷贝过去。

// slice方法接受两个参数，第一个参数表示拷贝开始的字节序号（含该字节），第二个参数表示拷贝截止的字节序号（不含该字节）。
// 如果省略第二个参数，则默认到原ArrayBuffer对象的结尾。

// 除了slice方法，ArrayBuffer对象不提供任何直接读写内存的方法，只允许在其上方建立视图，然后通过视图读写。


// ArrayBuffer.isView()
// ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。
// 这个方法大致相当于判断参数，是否为TypedArray实例或DataView实例。

const buffer = new ArrayBuffer(8);
ArrayBuffer.isView(buffer); // false

const v = new Int32Array(buffer);
ArrayBuffer.isView(v);      // true
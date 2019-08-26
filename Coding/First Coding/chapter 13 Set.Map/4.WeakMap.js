// 1: WeakMap结构与Map结构类似，也是用于生成键值对的集合。
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2) // "bar"

// 2: WeakMap与Map的区别有两点。

// 2.1: 首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key


// 2: 其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。
// WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];

// 上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。
// 一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。

// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;

// 上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。

// WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，
// 即垃圾回收机制不将该引用考虑在内。
// 因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。
// 也就是说，一旦不再需要，
// WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

// 基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。
// 一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用WeakMap结构。
// 当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
wm = new WeakMap();
elem = document.querySelector('div');
wm.set(elem, 'example');
wm.get(elem);     // 'example'

// 上面代码中，先新建一个 Weakmap 实例。
// 然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，
// 一起存放在 WeakMap 里面。
// 这时，WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制。

// 也就是说，上面的 DOM 节点对象的引用计数是1，而不是2。
// 这时，一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。
// Weakmap 保存的这个键值对，也会自动消失。

// 总之，WeakMap的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。
// 注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}
// 上面代码中，键值obj是正常引用。
// 所以，即使在 WeakMap 外部消除了obj的引用，WeakMap 内部的引用依然存在。


// 3: WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。
// 因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。
// 这一刻可以取到键名，下一刻垃圾回收机制突然运行了，
// 这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。
// 二是无法清空，即不支持clear方法。
// 因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。

const wm = new WeakMap();

// size、forEach、clear 方法都不存在
wm.size // undefined
wm.forEach // undefined
wm.clear // undefined


// 手动执行一次垃圾回收，保证获取的内存使用状态准确
> global.gc();
undefined

// 查看内存占用的初始状态，heapUsed 为 4M 左右
> process.memoryUsage();
{ rss: 21106688,
  heapTotal: 7376896,
  heapUsed: 4153936,
  external: 9059 }

> let wm = new WeakMap();
undefined

// 新建一个变量 key，指向一个 5*1024*1024 的数组
> let key = new Array(5 * 1024 * 1024);
undefined

// 设置 WeakMap 实例的键名，也指向 key 数组
// 这时，key 数组实际被引用了两次，
// 变量 key 引用一次，WeakMap 的键名引用了第二次
// 但是，WeakMap 是弱引用，对于引擎来说，引用计数还是1
> wm.set(key, 1);
WeakMap {}

> global.gc();
undefined

// 这时内存占用 heapUsed 增加到 45M 了
> process.memoryUsage();
{ rss: 67538944,
  heapTotal: 7376896,
  heapUsed: 45782816,
  external: 8945 }

// 清除变量 key 对数组的引用，
// 但没有手动清除 WeakMap 实例的键名对数组的引用
> key = null;
null

// 再次执行垃圾回收
> global.gc();
undefined

// 内存占用 heapUsed 变回 4M 左右，
// 可以看到 WeakMap 的键名引用没有阻止 gc 对内存的回收
> process.memoryUsage();
{ rss: 20639744,
  heapTotal: 8425472,
  heapUsed: 3979792,
  external: 8956 }

  
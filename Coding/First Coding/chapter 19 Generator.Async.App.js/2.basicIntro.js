// 基本概念

// (1)  异步
// 所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，
// 先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。

// 比如，有一个任务是读取文件进行处理，任务的第一段是向操作系统发出请求，要求读取文件。
// 然后，程序执行其他任务，等到操作系统返回文件，再接着执行任务的第二段（处理文件）。
// 这种不连续的执行，就叫做异步。

// 相应地，连续的执行就叫做同步。由于是连续执行，不能插入其他任务，
// 所以操作系统从硬盘读取文件的这段时间，程序只能干等着。


// (2) 回调函数
// JavaScript 语言对异步编程的实现，就是回调函数。
// 所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。
// 回调函数的英语名字callback，直译过来就是"重新调用"。


// (3) Promise
// 回调函数本身并没有问题，它的问题出现在多个回调函数嵌套。假定读取A文件之后，再读取B文件，代码如下。

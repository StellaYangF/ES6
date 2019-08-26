// 读懂 ECMAScript 规格

// 概述 

// 规格文件是计算机语言的官方标准，详细描述语法规则和实现方法。

// 一般来说，没有必要阅读规格，除非你要写编译器。
// 因为规格写得非常抽象和精炼，又缺乏实例，不容易理解，而且对于解决实际的应用问题，帮助不大。
// 但是，如果你遇到疑难的语法问题，实在找不到答案，这时可以去查看规格文件，了解语言标准是怎么说的。
// 规格是解决问题的“最后一招”。

// 这对 JavaScript 语言很有必要。
// 因为它的使用场景复杂，语法规则不统一，例外很多，各种运行环境的行为不一致，导致奇怪的语法问题层出不穷，
// 任何语法书都不可能囊括所有情况。查看规格，不失为一种解决语法问题的最可靠、最权威的终极方法。

// 本章介绍如何读懂 ECMAScript 6 的规格文件。

// ECMAScript 6 的规格，可以在 ECMA 国际标准组织的官方网站（www.ecma-international.org/ecma-262/6.0/）免费下载和在线阅读。

// 这个规格文件相当庞大，一共有 26 章，A4 打印的话，足足有 545 页。
// 它的特点就是规定得非常细致，每一个语法行为、每一个函数的实现都做了详尽的清晰的描述。
// 基本上，编译器作者只要把每一步翻译成代码就可以了。这很大程度上，保证了所有 ES6 实现都有一致的行为。

// ECMAScript 6 规格的 26 章之中，
// 第 1 章到第 3 章是对文件本身的介绍，与语言关系不大。
// 第 4 章是对这门语言总体设计的描述，有兴趣的读者可以读一下。
// 第 5 章到第 8 章是语言宏观层面的描述。
// 第 5 章是规格的名词解释和写法的介绍，
// 第 6 章介绍数据类型，
// 第 7 章介绍语言内部用到的抽象操作，
// 第 8 章介绍代码如何运行。
// 第 9 章到第 26 章介绍具体的语法。

// 对于一般用户来说，除了第 4 章，其他章节都涉及某一方面的细节，不用通读，只要在用到的时候，查阅相关章节即可。


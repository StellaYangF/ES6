// export 与 import 的复合写法

// 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。

export {foo, bar} from 'ny_module';

// it can be explained like the following
import {foo, bar} from 'my_module';
export {bar, foo};

// 上面代码中，export和import语句可以结合在一起，写成一行。
// 但需要注意的是，写成一行以后，foo和bar实际上并没有被导入当前模块，
// 只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。

// 模块的接口改名和整体输出，也可以采用这种写法。

// (1) 接口改名
export {foo as myFoo} from 'my_module';

// (2) 整体输出
export * from 'my_module';

// (3) 默认接口写法
export {default} from 'foo';

// (4) 具体接口改为默认接口
export {es6 as default} from 'foo';

// (5) 默认接口改为具体接口
export {default as es6} from 'foo';

// (6) 下面是那种import语句，没有对应的复合写法
import * as someIdentifier from 'someModule';
import someIdentifier from 'someModlue';
import someIdentifier, {nameIdentifier} from 'someModule';


// 提案
export * as someIdentifier from '...';
export someIdentifier from 'someModule';
export someIdentifier, {nameIdentifier} from 'someModule';
# Regular Expression

### Flags
##### u: unicode
##### i: ignore
##### g: global
##### y: sticky
##### s: 任意单个字符
* sticky: omit ^

```
    unicode: /^\uD83D/u.test('\uD83D\uDC2A')    // false
    ignore: 
    global: 
```

### Property
##### RegExp.prototype.flags
##### RegExp.prototype.unicode    
##### RegExp.prototype.stikcy    
##### RegExp.prototype.source    
##### RegExp.prototype.dotAll

```
    /tom/ig.flags   =>  "gi"
```
#### RegExp.prototype.

### Instance Methods
##### RegExp.prototype[Symbol.match]
##### RegExp.prototype[Symbol.replace]
##### RegExp.prototype[Symbol.search]
##### RegExp.prototype[Symbol.split]

##### RegExp.prototype.exec()
##### RegExp.prototype.test()

##### \p{UnicodePropertyName=UnicodePropertyValue}
##### \p{UnicodePropertyName}
##### \p{UnicodePropertyValue}

##### 先行断言
##### 后行断言
```
    (\d+(?=%)).exec('100%')   => ['100']
    (\d+(?!%)).exec('100')   => ['100']
    ((?<=%)\d+).exec('%100')   => ['100']
    ((?<!%)\d+).exec('100')   => ['100']
```

##### 具名组匹配 Named Capture Groups ES2018
```
    const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
    const matchObj = RE_DATE.exec('1999-12-31');
    => [0: "1999-12-31" 1: "1999" 2: "12" 3: "31, groups: undefined index: 0 input: "1999-12-31" length: 4]

    const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
    const matchObj = RE_DATE.exec('1999-12-31');
    => 
    [
      0: "1999-12-31", 
      1: "1999", 
      2: "12", 
      3: "31", 
      groups: {
        day: "31", 
        month: "12", 
        year: "1999",
      },
      index: 0, 
      input: "1999-12-31",
      length: 4
    ]
```

##### 解构赋值与替换
```
  *变量赋值*
    const { groups: { one, two } } = /^(?<one>.*):(?<two>.*)$/u.exec("foo:bar");
    one  // foo
    two  // bar
    groups // Uncaught ReferenceError:groups is not defined.
  *字符串替换*
   let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
   '2019-08-21'.replace(re, '$<day>/$<month>/$<year>')
   *回调函数替换*
    callback params:
    [ 
      0: "2019-08-21"
      1: "2019"
      2: "08"
      3: "21"
      4: 0
      5: "2019-08-21"
      6: {year: "2019", month: "08", day: "21"}
      length: 7
    ]
   '2019-08-21'.replace(re, (
     matched,
     captuer1,
     captuer2,
     captuer3,
     position,
     S,
     groups
   )=>{
     let { year, month, day } = groups;
     return `${day}/${month}/${year}`
   })
   => "21/08/2019"
```

##### 引用
* \k<组名>
```
    const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
    RE_TWICE.test('abc!abc') // true
    RE_TWICE.test('abc!ab') // false
```
* 数字引用（\1）依然有效。
```
    const RE_TWICE = /^(?<word>[a-z]+)!\1$/;
    RE_TWICE.test('abc!abc') // true
    RE_TWICE.test('abc!ab') // false
```
* 同时使用
```
    const RE_TWICE = /^(?<word>[a-z]+)!\k<word>!\1$/;
    RE_TWICE.test('abc!abc!abc') // true
    RE_TWICE.test('abc!abc!ab') // false
```

##### String.prototype.matchAll
* 返回的是interator，可放在循环中取出
* 可用数组扩展符转数组
* 可用Array.from()转数组
```
    const string = 'test1test2test3';
    const regex = /t(e)(st(\d?))/g;
    for (const match of string.matchAll(regex)) {
      console.log(match);
    }
    // 转为数组方法一
    [...string.matchAll(regex)]

    // 转为数组方法二
    Array.from(string.matchAll(regex));
```
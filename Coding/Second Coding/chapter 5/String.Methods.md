### String
#### Static method 
##### String.raw
``` 
    String.raw`Hi\n${2+3}`
      => "Hi\\n5"
    String.raw({ raw: "***"}, 1, 2)
      => "*1*2*"
```
##### String.fromCodePoint()
##### String.fromCharCode()
[not for code > 0xFFFF]

#### Instance method
##### String.codePointAt()
##### String.charCodeAt()
##### String.prototype.normalize()
* params: 
1. NFC: Nor malization Form Canonical Composition 标准等价合成
2. NFD: Normalization Form Canonical Decompoisiton  标准等价分解
3. NFKC: Normalization Form Compatibility Composition 兼容等价合成
4. NFKD: Normalization Form Compatibility Decompoisiton 兼容等价分解

##### String.prototype.includes("s", index)
##### String.prototype.startsWith("s", index)
##### String.prototype.endsWith("s", index)
* index is optional

##### String.prototype.repeat()

##### String.prototype.padStart(num, "s")
##### String.prototype.padEnd(num, "s")

##### String.prototype.trim()
##### String.prototype.trimStart()
##### String.prototype.trimEnd()

```` 
    browser add two extral methods
    String.prototype.trimLeft() = String.prototype.trimStart()
    String.prototype.trimRight() = String.prototype.trimEnd()
````

#### regExp methods
##### String.prototype.match()
##### String.prototype.replace()
##### String.prototype.search()
##### String.prototype.split()
``` 
    call RegExp.prototype[Symbol.match]
    call RegExp.prototype[Symbol.replace]
    call RegExp.prototype[Symbol.search]
    call RegExp.prototype[Symbol.split]
```


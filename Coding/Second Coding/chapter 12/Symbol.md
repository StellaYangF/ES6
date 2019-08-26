### Symbol.prototype.description
```
  Symbol("foo").description === "foo"       // true
  Symbol("foo").toString() === Symbol(foo)  // true
  Symbol() !== Symbol()            // false
```

### Symbol.for()
### Symbol.keyFor()

### built-in Symbol
1. Symbol.hasInstance
```
instanceof calls the instance's method [Symbol.hasInstance]
Example one:
  class ArrayModel {
    [Symbol.hasInstance] (obj)  {
      return obj instanceof Array;
    }
  }
  [1, 2, 3] instanceof new ArrayModel();      // true

Example two:
  class Person {
    [Symbol.hasInstance] (obj) {
      return obj instanceof Object;
    }
  }

  let obj = {name: "tom"};
  obj instanceof new Person();    

Example three:
  class Even {
    static [Symbol.hasInstance] (num) {
      return Number(num) % 2 === 0;
    }
  }

  1 instanceof Even;      // false
  2 instanceof Even;      // true

```
2. Sumbol.isConcatSpreadable
3. Symbol.species
4. Symbol.match
5. Symbol.replace
6. Symbol.search
7. Symbol.split
8. Symbol.iterator
9. Symbol.toPrimitive
10. Symbol.toStringTag
11. Symbol.unscopables 
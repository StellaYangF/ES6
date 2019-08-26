String.prototype.match(reg);

reg[Symbol.match] (this);

class Matcher {
  [Symbol.match] (string)  {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new Matcher());
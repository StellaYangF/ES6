String.prototype.search(regexp);
// equals to
regexp[Symbol.search] (this);

class Search {
  constructor (value) {
    this.value = value;
  }
  [Symbol.search] (string) {
    return string.indexOf(this.value);
  }
}

'foobar'.search(new Search('foo'));     // 0
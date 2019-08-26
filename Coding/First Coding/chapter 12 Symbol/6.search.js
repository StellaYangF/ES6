String.prototype.search(regexp);
// equals to
regexp[Symbol.search](this);

class MySearch{
  constructor(value){
    this.value = value;
  }
  [Symbol.search](string){
    return string.indexOf(this.value);
  }
}

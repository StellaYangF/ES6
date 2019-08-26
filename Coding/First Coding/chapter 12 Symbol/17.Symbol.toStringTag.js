class Collection{
  get [Symbol.toStringTag] () {
    return this;
  }
}
const c = new Collection();
console.log(Object.prototype.toString.call(c));
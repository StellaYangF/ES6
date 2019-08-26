class Collection{
  get [Symbol.toStringTag](){
    return 'Collection'
  }
}
let x = new Collection();
Object.prototype.toString.call(x);    // "[object Collection]"

Object.prototype.toString.call(new Promise(resolve=>resolve())) //  "[object Promise]"
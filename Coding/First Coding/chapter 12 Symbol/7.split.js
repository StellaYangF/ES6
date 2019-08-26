String.prototype.split(separator, limit);
// equals to 
separator[Symbol.split](this, limit);

class MySplitter{
  constructor(value){
    this.value = value;
  }
  [Symbol.split](string){
    let index = string.indexOf(this.value);
    if(index === -1){
      return string;
    }
    return [
      string.substr(0,index),
      string.substr(index+ this.value.length)
    ]
  }
}
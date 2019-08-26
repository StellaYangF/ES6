String.prototype.replace(searchValue, replaceValue);
// equals to 
searchValue[Symbol.replace](this, replaceValue);


const x = {};
x[Symbol.replace] = (...s) => console.log(s);


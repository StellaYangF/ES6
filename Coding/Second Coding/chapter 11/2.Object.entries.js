// generator version
Object.entries = function*(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
};

// non-generator version
Object.entries = obj => {
  let arr = [];
  for (let key of Object.keys(obj)) {
    arr.push([key, obj[key]]);
  }
  return arr;
};



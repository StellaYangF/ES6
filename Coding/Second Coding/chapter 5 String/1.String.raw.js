String.raw = function({raw = 'd'} = {}, ...values) {
  let output = '';
  let index;
  let len = values.length;
  raw = raw.repeat(len+1);

  for(index = 0; index< len; index++) {
    output += raw[index] + values[index];
  }
  output += raw[index];
  return output;
}

console.log(String.raw({},1,2,3,4));
console.log(String.raw({raw: 'hello'},1,2,3,4));

reg = /(\d{4})(\d{4})(\d{3})/;
"12345678912".replace(reg.exec(this)[2], num => "*");

// 
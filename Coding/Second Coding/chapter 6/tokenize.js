// 提取token词元
const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
const TOKEN_G = /\s*(\+|[0-9]+)\s*/g;

function tokenize(TOKEN_REG, str) {
  let result = [];
  let match;
  while (match = TOKEN_REG.exec(str)) {
    console.log(match);
    result.push(match[1]);
  }
  return result;
}

tokenize(TOKEN_Y, '3 + 4');
tokenize(TOKEN_G, '3 + 4');
//  ["3", "+", "4"]
//  ["3", "+", "4"]
tokenize(TOKEN_Y, '3x + 4')
// [ '3' ]
tokenize(TOKEN_G, '3x + 4')
// [ '3', '+', '4' ]
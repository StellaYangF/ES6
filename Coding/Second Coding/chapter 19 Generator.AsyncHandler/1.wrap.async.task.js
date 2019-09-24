const axios = require('axios');
let url ="https://api.github.com/users/github";
function* gen() {
  let result = yield axios(url);
  console.log(result);
}

// console.log(axios(url).then(data => console.log(data)));
let g = gen();
g.next().value.then(data => data.data).then(data => g.next(data))
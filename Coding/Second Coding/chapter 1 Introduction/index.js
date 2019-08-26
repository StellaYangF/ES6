let arr = Array.from('string');
let app = document.querySelector('#app');
arr.map(str => {
  var h1 = document.createElement('h1');
  h1.innerHTML = str;
  app.appendChild(h1);
});
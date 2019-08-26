function add([a, b]) {
  return a + b;
}

console
  .log(add([1, 2]))

  [([1, 2], [3, 4])].map(([a, b]) => a + b);

// destructing default value
function move({ x = 0, y = 0 } = {}) {
  return [x, y];
}

move({ x: 1, y: 2 }); // [1,2]
move({ x: 3 }); // [3, 0]
move({}); // [0,0]
move(); // [0,0]

// versus
function move({ x, y } = { x: 0, y: 0 }) {
  return [x, y];
}
move({ x: 1, y: 2 }); //[1,2]
move({ x: 3 }); //[3,undefined]
move({}); //[undefined, undefined]
move(); // [0 ,0]


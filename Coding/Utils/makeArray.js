import Tree from "./Tree";

function make(array) {
  return array.length === 0 ?
    new Error("Array structure required!") : 
    array.length === 1 ?
    new Tree(null, array[1], null) :
    new Tree(make(array[0]), array[1], make(array[2]));
}

export default make;
/******************************exmpale 1******************************************/
const handler = {
  deleteProperty (target, key) {
    invariant(key, 'deleite');
    delete target[key];
    return true;
  }
}

function invariant (key, action) {
  if (key[0] === '_') throw new Error(`Invalid atttempt to ${action} private ${key} property`);
}

const target = { _prop: "foo" };
const p = new Proxy(target, handler);
delete p._prop;
// Uncaught Error: Invalid atttempt to deleite private _prop property

export default createArray = (...elements) => {
  let handler = {
    get (target, property, receiver) {
      let index = Number(property);
      property = index < 0 ? String(target.length + index) : index;
      return target[property];
    }
  }
  let target = [...elements];
  return new Proxy(target, handler);
}
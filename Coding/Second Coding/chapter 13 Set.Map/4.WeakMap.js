const _counter = new WeakMap();
const _action = new WeakMap();
const DONE ='DONE';

class Countdown {
  constructor(count, action) {
    _counter.set(this, count);
    _action.set(this, action);
  }
  
  dec () {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter --;
    _counter.set(this, counter);
    if(counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log(DONE));
c.dec();
c.dec();
// 
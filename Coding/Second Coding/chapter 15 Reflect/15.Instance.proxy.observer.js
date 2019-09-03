// 观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。
// before

class Subject {
  constructor (name) {
    this.name = name;
    this.state = 'happy';
    this.stack =  [];
    // this.stack = new Set();
  }

  attach (...observers) {
    this.stack.push(...observers);
    // this.stack.add(...observers)
  }

  setState (state) {
    if (state === this.state) {
      console.log('No anything important.');
      return;
    }
    this.state = state;
    this.stack.map(observer => observer.update(state,this.name));
  }
}

class Observer {
  constructor (name) {
    this.name = name;
  }
  update (state, subject) {
    console.log(`${this.name}, ${subject} is ${state}.`);
  }
}

const o1 = new Observer('Mom');
const o2 = new Observer('Dad');
const s1 = new Subject('Baby');

s1.attach(o1, o2);
s1.setState('unhappy');

// Proxy
const queuedObservers = new Set();
const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set (target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}

const person = observable({
  name: 'Tom',
  age: 27,
});

function print () {
  console.log(`${person.name}, ${person.age}`);
}

observe(print);
person.name= 'Lily';
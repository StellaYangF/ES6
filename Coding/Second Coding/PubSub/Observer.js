class Subject {
  constructor (name) {
    this.name = name;
    this.state = 'happy';
    this.stack =[];
  }

  attach (...observer) {
    this.stack.push(...observer);
  }

  setState (newState) {
    this.state !== newState
      ? this.stack.map(observer => observer.update(this.name, newState))
      : console.log('New state is the same as the former one.');
  }
}

class Observer {
  constructor (name) {
    this.name = name;
  }

  update (subject, newState) {
    console.log(`${this.name}, ${subject} is ${newState}`)
  }
}

const baby = new Subject('Baby');
const mom = new Observer('Mom');
const dady = new Observer('Daddy');

baby.attach(mom, dady);
baby.setState('unhappy');
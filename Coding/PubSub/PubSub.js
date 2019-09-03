class Event {
  constructor () {
    this.stack = [];
  }

  on (eventName, callback) {
    this.stack.push({ eventName, callback})
  }

  emit (eventName) {
    !eventName
    ? this.stack.map(obj => obj.callback())
    : this.stack.find(obj => obj.eventName === eventName).callback();
  }
}

const fs = require('fs');
const student = {};
const event = new Event();
event.on('click', ()=> console.log('clicked'));
event.on('touch', ()=> console.log('touched'));
event.on('consoleStudent',()=>{
  if(Object.keys(student).length === 2) console.log(student);
})

fs.readFile('./name.txt', 'utf8', (err, name)=> {
  student.name = name;
  event.emit('click');
  event.emit();
})
fs.readFile('./age.txt', 'utf8', (err, age) => {
  student.age = age;
  event.emit();
})


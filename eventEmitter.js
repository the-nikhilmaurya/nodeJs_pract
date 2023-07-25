const EventEmitter = require('events');

class myEmitter extends EventEmitter{};
const myEmitter1 = new myEmitter();

myEmitter1.on("waterfull",()=>{
    console.log("turn offf water pump");
    setTimeout(() => {
        console.log("will you do or should i come");
    }, 5000);
})
console.log("event starts")
myEmitter1.emit('waterfull')
console.log("event stilll running")

// Example of basic use of Node's EventEmitter

// Import events module
const events = require('events');

// Create an eventEmitter object
const eventEmitter = new events.EventEmitter();

// The 'newListener' event is automatically fired when an event listener is attached
// (as in line X below). The callback defined is automatically
// passed the string identifier of the event, and a reference to the listener attached.
eventEmitter.once('newListener', (event, listener) => {
    console.log(`New Listener on event: ${event}. Listener is: ${listener}`);
});

// Attach a listener to the event emitter.The callback will fire
// when the event 'event1' is emitted.
// You can specify as many parameters as you like :)
function callback(msg, data) {
    console.log(`Message: ${msg}`);
    console.log(`Data: ${data}`);
}
eventEmitter.on('event1', callback);

// Emit the event
eventEmitter.emit('event1', 'Message1', 'Data1');  // callback on line X fires
eventEmitter.emit('event2', 'Message2', 'Data2');  // no listeners; nothing happens

// Remove the listener
eventEmitter.removeListener('event1', callback);
eventEmitter.emit('event1', 'Message1', 'Data1');  // no listeners; nothing happens
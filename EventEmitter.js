// Basic implementation of Node's EventEmitter

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, subscriber) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(subscriber);
    }

    emit(event, ...args) {
        if (!this.events[event] || !this.events[event].length) return;

        for (let subscriber of this.events[event]) {
            subscriber(...args);
        }
    }

    removeListener(event, subscriber) {
        if (!this.events[event] || !this.events[event].length) return;

        for (let i = 0; i < this.events[event].length; i++) {
            if (this.events[event][i] == subscriber) {
                this.events[event].splice(i, 1);
                break;
            }
        }
    }
}

// *** TESTING ***
const ee = new EventEmitter();

function cb1(param1, param2) {
    console.log(`event1: ${param1} ${param2}`);
}
function cb2(param1, param2) {
    console.log(`event2: ${param1} ${param2}`);
}

ee.on('event1', cb1);
ee.on('event1', cb2);
ee.emit('event1', 'was', 'called');  // event1: was called
ee.emit('event2', 'was', 'called');  // event2: was called

console.log('\n-=-=-=-=-\n');

ee.removeListener('event1', cb1)
ee.emit('event1', 'was', 'called');  // no listeners: nothing happens
ee.emit('event2', 'was', 'called');  // event2: was called

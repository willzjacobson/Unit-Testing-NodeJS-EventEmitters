const EventEmitter = require('events').EventEmitter;

class PingPing extends EventEmitter {
    constructor() {
        super();
        this.on('ping', this.pong);
    }

    ping() {
        console.log('ping');
        this.emit('ping');
    }

    pong() {
        console.log('pong');
    }
}

const pingPong = new PingPing();
pingPong.ping();
// ping
// pong

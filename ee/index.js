const ee = new (require('events').EventEmitter)();

const { Order } = require('./modules');
const attachListeners = require('./attach-listeners');

attachListeners(ee);


// Demonstrate functionality
const order = new Order(ee);

order.create({
    product: 'shoes',
    name: 'Shoeless Joe Jackson',
    email: 'joe@whitesocks.com'
});
// Email about shoes sent to joe@whitesocks.com
// Order for shoes from Shoeless Joe Jackson saved in DB
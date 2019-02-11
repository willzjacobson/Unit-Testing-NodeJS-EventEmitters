const { database, emailer } = require('./modules');

module.exports = ee => {
    ee.on('order/create', emailer.sendEmail);
    ee.on('order/create', database.saveOrder);
};

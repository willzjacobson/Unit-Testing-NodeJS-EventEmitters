const emailer = {
    sendEmail: orderDetails => {
        console.log(`Email about ${orderDetails.product} sent to ${orderDetails.email}`);
    },
};

const database = {
    saveOrder: orderDetails => {
        console.log(`Order for ${orderDetails.product} from ${orderDetails.name} saved in DB`);
    },
};

class Order {
    constructor(ee) {
        this.ee = ee;
    }

    create(orderDetails) {
        this.ee.emit('order/create', orderDetails);
    }
}

module.exports = {
    database,
    emailer,
    Order,
};

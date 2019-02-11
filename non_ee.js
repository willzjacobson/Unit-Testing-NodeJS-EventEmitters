// Example of a very simple app that DOES NOT use event emitters, but may benefit from them.

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
    create(orderDetails) {
        emailer.sendEmail(orderDetails);
        database.saveOrder(orderDetails);
    }
}

const order = new Order();
order.create({
    product: 'shoes',
    name: 'Shoeless Joe Jackson',
    email: 'joe@whitesocks.com'
});
// Email about shoes sent to joe@whitesocks.com
// Order for shoes from Shoeless Joe Jackson saved in DB
const EventEmitter = require('events').EventEmitter;
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const { Order, emailer, database } = require('./ee/modules');
const attachListeners = require('./ee/attach-listeners');

describe('testing event emission and response', function() {

    const fakeOrder = {
        product: 'shoes',
        name: 'Shoeless Joe Jackson',
        email: 'joe@whitesocks.com'
    }
    
    // Test that creating an order emits the event correctly
    describe('Order class', function() {
        it('emits order/create event on order creation', function() {
            // create dummy event emitter and spy on 'emit' method;
            const spy = sinon.spy();
            const fakeEE = {
                emit: spy,
            };

            // initialize instance of Order class with dummy event emitter
            const order = new Order(fakeEE);
            // Create a new order (should emit event)
            order.create(fakeOrder);

            // Test that emit method was called once
            expect(spy.called).to.be.true;
            expect(spy.callCount).to.equal(1);
        
            // Test that the event emitted with the correct data
            const [ eventName, orderDetails ] = spy.getCall(0).args;
            expect(eventName).to.equal('order/create');
            expect(orderDetails).to.deep.equal(fakeOrder);
        });
    });

    let sandbox, sendEmailStub, saveOrderStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        // stub out subscribers
        sendEmailStub = sandbox.stub(emailer, 'sendEmail');
        saveOrderStub = sandbox.stub(database, 'saveOrder');        
    });

    afterEach(() => sandbox.restore());

    // Test that emailer sends email when the event is fired
    describe('emailer module', function() {
        it('sends email when event is fired', function() {
            // create event emitter instance and attach listeners as in the app
            ee = new EventEmitter();
            attachListeners(ee);

            // Create order (should fire event)
            const order = new Order(ee);
            order.create(fakeOrder);

            // Test that sendEmail was called once, with correct arguments
            expect(sendEmailStub.called).to.be.true;
            expect(sendEmailStub.callCount).to.equal(1);
            const [ emailDetails ] = sendEmailStub.getCall(0).args;
            expect(emailDetails).to.deep.equal(fakeOrder);
        });
    });
    
    // Test that database saves the order details when the event is fired
    describe('database module', function() {
        it('saves order when event is fired', function() {
            // create event emitter instance and attach listeners as in the app
            ee = new EventEmitter();
            attachListeners(ee);
            
            // Create order (should fire event)
            const order = new Order(ee);
            order.create(fakeOrder);
            
            // Test that saveOrder was called once, with correct arguments
            expect(saveOrderStub.called).to.be.true;
            expect(saveOrderStub.callCount).to.equal(1);
            const [ saveDetails ] = saveOrderStub.getCall(0).args;
            expect(saveDetails).to.deep.equal(fakeOrder);
        });
    });
});
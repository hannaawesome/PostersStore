const debug = require("debug")("mongo:model-order");
const mongo = require("mongoose");

const orderSchema = mongo.Schema({    // create a schema
        _id:String,
        user_id: String,
        itemsInOrder:Array,//array of (poster_id,amount,measurement)
        shipmentAddress:String,
        totalPrice:Number,
        createdAt: { type: Date, default: Date.now() },
        active:Boolean
    }, { autoIndex: false });

    orderSchema.statics.CREATE = async function (order) {

        return this.create({
            _id:order[0],
            user_id: order[1],
            itemsInOrder:order[2],//[poster_id,amount,measurement]
            shipmentAddress:order[3],
            totalPrice:order[4],
            active:true
        });
    };
    orderSchema.statics.FIND_ONE_ORDER = async function (_id) {
        let poster={
            _id:_id
        };
        return this.findOne(poster).exec();
    };
    orderSchema.statics.DELETE = async function (order) {
        const filter = { _id: order._id };
        const update = { active: false };
        // `doc` is the document _before_ `update` was applied
        let doc = await this.findOneAndUpdate(filter, update);
        await doc.save();
        debug("order deleted");

    };
    orderSchema.statics.UPDATE = async function (updatedOrder) {
        let queryForUpdate;
        queryForUpdate= this.FIND_ONE_CART(updatedOrder._id);
        let orderToUpdate;
        [orderToUpdate]=await Promise.all([queryForUpdate]);
        if(orderToUpdate) {
            orderToUpdate.user_id=updatedOrder.user_id;
            orderToUpdate.itemsInOrder=updatedOrder.itemsInOrder;
            orderToUpdate.shipmentAddress= updatedOrder.shipmentAddress;
            orderToUpdate.totalPrice=updatedOrder.totalPrice;
            orderToUpdate.save();
        }
        else
            console.log("Can't update: order does not exist!");
    };
    orderSchema.statics.REQUEST = async function () {
        // no arguments - bring all at once
        const args = Array.from(arguments); // [...arguments]
        if (args.length === 0) {
            debug("request: no arguments - bring all at once");
            return this.find({}).exec();
        }

        // perhaps last argument is a callback for every single document
        let callback = arguments[arguments.length - 1];
        if (callback instanceof Function) {
            let asynch = callback.constructor.name === 'AsyncFunction';
            debug(`request: with ${asynch ? 'async' : 'sync'} callback`);
            args.pop();
            let cursor, product;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (product = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(product);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(product);
                    }
                }
            } catch (err) { throw err; }
            return;
        }

        // request by id as a hexadecimal string
        /*if (args.length === 1 && typeof args[0] === "string") {
            debug("request: by ID");
            return this.findById(args[0]).exec();
        }*/

        // There is no callback - bring requested at once
        debug(`request: without callback: ${JSON.stringify(args)}`);
        return this.find(...args).exec();
    };


    const Order = mongo.model('Order', orderSchema);

    module.exports = { Order };
const debug = require("debug")("mongo:model-cart");
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        name: String,
        imageContentType: String,
        imageData: Buffer,
        price: Number,
        quantity: Number
    }, { autoIndex: false });

    schema.statics.CREATE = async function(itemInCart) {
        return this.create({
            name: itemInCart[0],
            imageContentType: itemInCart[1],
            imageData: itemInCart[2],
            price: itemInCart[3],
            quantity: itemInCart[4]
        });
    };

    schema.statics.REQUEST = async function() {
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
            debug(`request: with ${asynch?'async':'sync'} callback`);
            args.pop();
            let cursor, itemInCart;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (itemInCart = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(itemInCart);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(itemInCart);
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

    db.model('ItemInCart', schema); // if model name === collection name
};

const debug = require("debug")("mongo:models-poster");
const mongo = require("mongoose");

    // create a schema
    const posterSchema = mongo.Schema({
        _id: String,
        name: {type: String},
        creator: String,
        img: {
            type: Array,
            default: []
        },
        price: Number,
        sizeList: Array,//array of string
        tagList: Array,
        amount: Number,
        active: Boolean
    }, {autoIndex: false});

    posterSchema.statics.CREATE = async function (poster) {
        return this.create({
            _id: poster[0],
            name: poster[1],
            creator: poster[2],
            img: poster[3],
            price: poster[4],
            sizeList: poster[5],
            tagList: poster[6],
            amount: poster[7],
            active: true
        });
    };

    posterSchema.statics.REQUEST = async function () {
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
            let cursor, poster;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) {
                throw err;
            }
            try {
                while (null !== (poster = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(poster);
                        } catch (err) {
                            throw err;
                        }
                    } else {
                        callback(poster);
                    }
                }
            } catch (err) {
                throw err;
            }
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
    posterSchema.statics.FIND_ONE_POSTER = async function (_id) {
        let poster = {
            _id: _id
        };
        return this.findOne(poster).exec();
    };
    posterSchema.statics.DELETE = async function (pid) {
        const filter = {_id: pid};
        const update = {active: false};
        let doc = await this.findOneAndUpdate(filter, update);
        await doc.save();
        debug("poster deleted");
    };
    posterSchema.statics.UPDATE = async function (updatedPoster) {
        const filter = {_id: updatedPoster._id};
        let doc = await this.findOneAndUpdate(filter, updatedPoster);
        await doc.save();

    };

    const Poster = mongo.model('Poster', posterSchema);

    module.exports = { Poster };


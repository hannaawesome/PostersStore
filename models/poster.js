const debug = require("debug")("mongo:models-poster");
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        _id:String,
        name: { type: String, required: true},
        creator: String,
		img: Buffer,
        type_of_image:String,
		price: Number,
        measurement:{
            width:Number,
            length:Number
        },
        tagList:Array,
        amount:Number,
        active:Boolean
    }, { autoIndex: false });

    schema.statics.CREATE = async function(poster) {
        return this.create({
            _id:poster[0],
            name: poster[1],
            creator:poster[2],
			img: poster[3],
            type_of_image:poster[4],
            price: poster[5],
            measurement:poster[6],
            tagList:poster[7],
            amount:poster[8],
            active:true
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
            let cursor, poster;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (poster = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(poster);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(poster);
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
    schema.statics.FIND_ONE_POSTER = async function (_id) {
        let poster={
            _id:_id
        };
        return this.findOne(poster).exec();
    };
    schema.statics.DELETE = async function (poster) {
        const filter = { _id: poster._id };
        const update = { active: false };
        // `doc` is the document _before_ `update` was applied
        let doc = await this.findOneAndUpdate(filter, update);
        await doc.save();
        debug("poster deleted");
    };
    schema.statics.UPDATE = async function (updatedPoster) {
        let queryForUpdate;
        queryForUpdate= this.FIND_ONE_POSTER(updatedPoster._id);
        let posterToUpdate;
        [posterToUpdate]=await Promise.all([queryForUpdate]);
        if(posterToUpdate) {
            posterToUpdate.name=updatedPoster.name;
            posterToUpdate.creator = updatedPoster.creator;
            posterToUpdate.img= updatedPoster.img;
            posterToUpdate.type_of_image=updatedPoster.type_of_image;
            posterToUpdate.price=updatedPoster.price;
            posterToUpdate.measurement.width=updatedPoster.measurement.width;
            posterToUpdate.measurement.length=updatedPoster.measurement.length;
            posterToUpdate.tagList=updatedPoster.tagList;
            posterToUpdate.amount=updatedPoster.amount;

            posterToUpdate.save();
        }
        else
            console.log("Can't update: poster does not exist!");
    };

    db.model('Poster', schema); // if model name === collection name
};

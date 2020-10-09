const debug = require("debug")("mongo:models-poster");
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        _id:String,
        name: { type: String, required: true},
        creator: String,
		img: String,
		price: Number,
        measurement:{type:String,default:"50X70"},
        sizeList:Array,//array of string
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
            price: poster[4],
            measurement:poster[5],
            sizeList:poster[6],
            tagList:poster[6],
            amount:poster[7],
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
    schema.statics.DELETE = async function (pid) {
        const filter = { _id: pid };
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
            posterToUpdate.price=updatedPoster.price;
            posterToUpdate.measurement=updatedPoster.measurement;
            posterToUpdate.sizeList=updatedPoster.sizeList;
            posterToUpdate.tagList=updatedPoster.tagList;
            posterToUpdate.amount=updatedPoster.amount;

            posterToUpdate.save();
        }
        else
            console.log("Can't update: poster does not exist!");
    };

    db.model('Poster', schema); // if model name === collection name
};

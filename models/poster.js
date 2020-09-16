const debug = require("debug")("mongo:models-poster");
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        name: { type: String, required: true, unique: true},
        creator: String,
		img: Buffer,
        type_of_image:String,
		price: Number
    }, { autoIndex: false });

    schema.statics.CREATE = async function(poster) {
        return this.create({
            name: poster.name,
            creator: poster.creator,
			img: poster.img,
            type_of_image:poster.type_of_image,
            price: poster.price
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
    schema.statics.FIND_ONE_FLOWER = async function (fName) {
        let poster={
            name:fName
        };
        return this.findOne(poster).exec();
    };
    schema.statics.DELETE = async function (fName) {
        let queryForDelete;
        queryForDelete= this.FIND_ONE_FLOWER(fName);
        let posterToDelete;
        [posterToDelete]=await Promise.all([queryForDelete]);
        if(posterToDelete)
            posterToDelete.remove();
        else
            console.log("Can't delete: poster does not exist!"+fName);
    };
    schema.statics.UPDATE = async function (updatedPoster) {
        let queryForUpdate;
        queryForUpdate= this.FIND_ONE_FLOWER(updatedPoster.name);
        let posterToUpdate;
        [posterToUpdate]=await Promise.all([queryForUpdate]);
        if(posterToUpdate) {
            posterToUpdate.price=updatedPoster.price;
            posterToUpdate.save();
        }
        else
            console.log("Can't update: poster does not exist!");
    };

    db.model('Poster', schema); // if model name === collection name
};

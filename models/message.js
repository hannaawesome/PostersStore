const debug = require("debug")("mongo:model-message");
const mongo = require("mongoose");

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        _id:String,
		msg : String,
        e_mail:String,
        fullname: {
            fname: String,
            lname : String
        },
        date : Date,
        active:Boolean
    }, { autoIndex: true });

    schema.statics.CREATE = async function(message) {
        return this.create({
            _id : message[0],
            msg : message[1],
            e_mail:message[2],
            fullname:message[3],
            date : message[4],
            active:true
        });
    };
	
	schema.statics.REQUEST = async function() {
        // no arguments - bring all at once
        const args = Array.from(arguments); // [...arguments]
        if (args.length === 0) {
            //debug("request: no arguments - bring all at once");
            return this.find({}).exec();
        }

        // perhaps last argument is a callback for every single document
        let callback = arguments[arguments.length - 1];
        if (callback instanceof Function) {
            let asynch = callback.constructor.name === 'AsyncFunction';
            //debug(`request: with ${asynch?'async':'sync'} callback`);
            args.pop();
            let cursor, message;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (message = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(message);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(message);
                    }
                }
            } catch (err) { throw err; }
            return;
        }

        // request by id as a hexadecimal string
        if (args.length === 1 && typeof args[0] === "string") {
            //debug("request: by ID");
            return this.findById(args[0]).exec();
        }

        // There is no callback - bring requested at once
        //debug(`request: without callback: ${JSON.stringify(args)}`);
        return this.find(...args).exec();
    };

    schema.statics.FIND_ONE_MESSAGE= async function (_id) {
        return this.findOne({_id:_id}).exec();
    };
    schema.statics.DELETE = async function (message) {
        const filter = { _id: message._id };
        const update = { active: false };
        // `doc` is the document _before_ `update` was applied
        let doc = await this.findOneAndUpdate(filter, update);
        await doc.save();
        debug("massage deleted");
    };
    schema.statics.UPDATE = async function (updatedMessage) {
        let queryForUpdate;
        queryForUpdate= this.FIND_ONE_MESSAGE(updatedMessage._id);
        let messageToUpdate;
        [messageToUpdate]=await Promise.all([queryForUpdate]);
        if(messageToUpdate) {
            messageToUpdate.fullname.fname= updatedMessage.fullname.fname;
            messageToUpdate.fullname.lname= updatedMessage.fullname.lname;
          messageToUpdate.msg=updatedMessage.msg;
            messageToUpdate.e_mail= updatedMessage.e_mail;
            messageToUpdate.date= updatedMessage.date;
            messageToUpdate.save();
        }
        else
            console.log("Can't update: user does not exist!");
    };
    // the schema is useless so far
    // we need to create a model using it
    // db.model('User', schema, 'User'); // (model, schema, collection)
    db.model('Message', schema); // if model name === collection name
};

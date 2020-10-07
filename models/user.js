const debug = require("debug")("mongo:models-user");
const mongo = require("mongoose");
let passportLocalMongoose = require('passport-local-mongoose');

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        _id:String,
        e_mail: { type: String, required: true, unique: true},
       // password: { type: String, required: true },
        fullName: {
            fName: String,
            lName : String
        },
        phone: String,
        category: String,
        cartItems:Array,//array of (PosterId,amount,measurement)
        orderHistory:Array,//array of (OrderId)
        likedItems:Array,//array of (PostersId)
        active:Boolean,
        resetPasswordToken: String,
        resetPasswordExpires: Date
    }, { autoIndex: false });

    schema.statics.CREATE = async function(user) {
        return this.create({
            _id:user._id,
            password: user.password,
            fullName: user.fullName,
            phone: user.phone,
            e_mail: user.e_mail,
            category:user.category,
            cartItems: user.cartItems,
            orderHistory: user.orderHistory,
            likedItems: user.likedItems,
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
            let cursor, user;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (user = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(user);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(user);
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

    schema.statics.FIND_ONE_USER = async function (_id) {
        return this.findOne({_id:_id}).exec();
    };
    schema.statics.DELETE = async function (uid) {
        const filter = { _id: uid };
        const update = { active: false };
        // `doc` is the document _before_ `update` was applied
        let doc = await this.findOneAndUpdate(filter, update);
        await doc.save();
        debug("user deleted");
    };
    schema.statics.UPDATE = async function (updatedUser,password) {
        let queryForUpdate;
        queryForUpdate= this.FIND_ONE_USER(updatedUser._id);
        let userToUpdate;
        [userToUpdate]=await Promise.all([queryForUpdate]);
        if(userToUpdate) {
            userToUpdate.fullName.fName= updatedUser.fullName.fName;
            userToUpdate.fullName.lName= updatedUser.fullName.lName;
            userToUpdate.phone=updatedUser.phone;
            userToUpdate.e_mail= updatedUser.e_mail;
            userToUpdate.cartItems= updatedUser.cartItems;
            userToUpdate.orderHistory= updatedUser.orderHistory;
            userToUpdate.likedItems= updatedUser.likedItems;
            userToUpdate.setPassword(password);
            userToUpdate.save();
        }
        else
            console.log("Can't update: user does not exist!");
    };
    schema.statics.UPDATE_STATUS = async function (updatedUser) {
        let queryForUpdate;
        queryForUpdate= this.FIND_ONE_USER(updatedUser._id);
        let userToUpdate;
        [userToUpdate]=await Promise.all([queryForUpdate]);
        if(userToUpdate) {
            userToUpdate.category=updatedUser.category;
            userToUpdate.save();
        }
        else
            console.log("Can't update: user does not exist!");

    };
    schema.plugin(passportLocalMongoose, { usernameField: "e_mail" });

    // the schema is useless so far
    // we need to create a model using it
    // db.model('User', schema, 'User'); // (model, schema, collection)
    db.model('User', schema); // if model name === collection name
};

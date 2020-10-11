const debug = require("debug")("mongo:models-user");
const mongo = require("mongoose");
let passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongo.Schema({
    // create a schema
        _id:String,
        e_mail: { type: String, required: true, unique: true},
        fullName: String,
        phone: String,
        address:String,
        category: String,
        cartItems:Array,//array of (PosterId,amountChosen,measurementChosen)
        orderHistory:Array,//array of (OrderId)
        likedItems:Array,//array of (PostersId)
        active: {type: Boolean , default:true},
        resetPasswordToken:{type: String},
        resetPasswordExpires:{ type: Date },
    }, { autoIndex: false });

userSchema.statics.CREATE = async function(user) {
        return this.create({
            _id:user._id,
            password: user.password,
            fullName:user.fullName,
            address:user.address,
            phone: user.phone,
            e_mail: user.e_mail,
            category:user.category,
            cartItems: user.cartItems,
            orderHistory: user.orderHistory,
            likedItems: user.likedItems,
            active:true
        });
    };

userSchema.statics.REQUEST = async function() {
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

userSchema.statics.FIND_ONE_USER = async function (email) {
        return this.findOne({e_mail:email,active:true}).exec();
    };
userSchema.statics.DELETE = async function (email) {
        const filter = { e_mail: email };
        const update = { active: false };
        // `doc` is the document _before_ `update` was applied
        let doc = await this.findOneAndUpdate(filter, update);
        await doc.save();
        debug("user deleted");
    };
userSchema.statics.UPDATE = async function (updatedUser,password) {
        console.log(updatedUser.e_mail);
        let queryForUpdate;
        queryForUpdate= this.FIND_ONE_USER(updatedUser.e_mail);
        let userToUpdate;
        [userToUpdate]=await Promise.all([queryForUpdate]);
        if(userToUpdate) {
            userToUpdate.fullName= updatedUser.fullName;
            userToUpdate.address= updatedUser.address;
            userToUpdate.phone=updatedUser.phone;
            userToUpdate.cartItems= updatedUser.cartItems;
            userToUpdate.orderHistory= updatedUser.orderHistory;
            userToUpdate.likedItems= updatedUser.likedItems;
            userToUpdate.resetPasswordToken=updatedUser.resetPasswordToken;
            userToUpdate.setPassword(password);
            userToUpdate.save();
        }
        else
            console.log("Can't update: user does not exist!");
    };

userSchema.plugin(passportLocalMongoose, { usernameField: "e_mail" });

const User = mongo.model('User', userSchema);

module.exports = { User };


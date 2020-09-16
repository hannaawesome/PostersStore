const debug = require("debug")("mongo:models-user");
const mongo = require("mongoose");
let passportLocalMongoose = require('passport-local-mongoose');

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        user_name: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        fullname: {
            fname: String,
            lname : String
        },
		address: {
            street: String,
            city: String,
			state: String
        },
        phone: String,
        mail: String,
        category: String,
        bnumber: String,
        resetPasswordToken: String,
        resetPasswordExpires: Date
    }, { autoIndex: false });

    schema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };

    schema.statics.CREATE = async function(user) {
        return this.create({
            user_name: user.user_name,
            password: user.password,
            fullname: user.fullname,
			address: user.address,
            phone: user.phone,
            mail: user.mail,
            category:user.category,
            bnumber: user.bnumber
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

    schema.statics.FIND_ONE_USER = async function (usrName, pass) {
        return this.findOne({user_name:usrName,password:pass}).exec();
    };
    schema.statics.DELETE = async function (userName, pass) {
        let queryForDelete;
        queryForDelete= this.FIND_ONE_USER(userName, pass);
        let userToDelete;
            [userToDelete]=await Promise.all([queryForDelete]);
            if(userToDelete)
                userToDelete.remove();
            else
                console.log("Can't delete: user does not exist!");
    };
    schema.statics.UPDATE = async function (updatedUser) {
        let queryForUpdate;
        queryForUpdate= this.FIND_ONE_USER(updatedUser.user_name, updatedUser.password);
        let userToUpdate;
        [userToUpdate]=await Promise.all([queryForUpdate]);
        if(userToUpdate) {
            userToUpdate.user_name = updatedUser.user_name;
            userToUpdate.password= updatedUser.password;
            userToUpdate.fullname.fname= updatedUser.fullname.fname;
            userToUpdate.fullname.lname= updatedUser.fullname.lname;
            userToUpdate.address.street= updatedUser.address.street;
            userToUpdate.address.city= updatedUser.address.city;
            userToUpdate.address.state= updatedUser.address.state;
            userToUpdate.phone=updatedUser.phone;
            userToUpdate.mail= updatedUser.mail;
            userToUpdate.save();
        }
        else
            console.log("Can't update: user does not exist!");
    };
    schema.statics.UPDATE_STATUS = async function (updatedUser) {
        let queryForUpdate;
        queryForUpdate= this.FIND_ONE_USER(updatedUser.user_name, updatedUser.password);
        let userToUpdate;
        [userToUpdate]=await Promise.all([queryForUpdate]);
        if(userToUpdate) {
            userToUpdate.category=updatedUser.category;
            userToUpdate.bnumber= updatedUser.bnumber;
            if(updatedUser.category == "customer") {
                userToUpdate.bnumber = "null";
            }
            userToUpdate.save();
        }
        else
            console.log("Can't update: user does not exist!");

    };
    schema.plugin(passportLocalMongoose);

    // the schema is useless so far
    // we need to create a model using it
    // db.model('User', schema, 'User'); // (model, schema, collection)
    db.model('User', schema); // if model name === collection name
};

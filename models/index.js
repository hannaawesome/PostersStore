const debug = require("debug")("mongo:models");
const mongo = require("mongoose");
const URI = require('../mongoConfig');

mongo.connect(process.env.MONGODB_URI || URI);

let db = mongo.createConnection();
mongo.connection.on('connected', () => {
    console.log('Established Mongoose Default Connection');
});

// When connection throws an error
mongo.connection.on('error', err => {
    console.log('Mongoose Default Connection Error : ' + err);
});
const passport = require("passport");
require("./user")(db);
require("./poster")(db);
require("./branch")(db);
require("./order")(db);
require("./message")(db);

module.exports = (model) => db.model(model);
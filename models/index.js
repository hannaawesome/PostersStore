const debug = require("debug")("mongo:models");
const mongo = require("mongoose");
const URI = require('../mongoConfig');

mongo.set("useFindAndModify", false);
let db = mongo.createConnection();
(async () => {
    try {
        await db.openUri(
            URI);
    } catch (err) {
        debug("Error connecting to DB: " + err);
    }
})();
const passport = require("passport");
require("./user")(db);
require("./poster")(db);
require("./order")(db);
require("./message")(db);

module.exports = (model) => db.model(model);
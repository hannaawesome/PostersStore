const debug = require("debug")("mongo:models");
const mongo = require("mongoose");
let db = mongo.createConnection();
(async () => {
    try {
        await db.openUri('mongodb://localhost/TheProject');
    } catch (err) {
        debug("Error connecting to DB: " + err);
    }
})();
debug('Pending DB connection');
require("./user")(db);
require("./branch")(db);
require("./poster")(db);
require("./order")(db);
require("./message")(db);


module.exports = model => db.model(model);

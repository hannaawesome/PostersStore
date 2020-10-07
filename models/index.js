const debug = require("debug")("mongo:models");
const mongo = require("mongoose");
//mongodb://localhost/TheProject
const dbuser = 'hanna';
const dbpassword = 'Hannaw18';
let db = mongo.createConnection();
(async () => {
    try {
        await db.openUri(`mongodb+srv://${dbuser}:${dbpassword}@cluster0.nxjsf.azure.mongodb.net/test?retryWrites`);
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

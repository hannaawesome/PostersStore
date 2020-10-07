const express = require("express");
const User = require("../models")("User");
const Message = require("../models")("Message");
const Order = require("../models")("Order");
const Poster = require("../models")("Poster");
const router = express.Router();
const debug = require("debug")("TheProject:UpdatePosterCartAmount");
const connectEnsureLogin = require("connect-ensure-login");

router.post('/',connectEnsureLogin.ensureLoggedIn(), async function(req, res,next) {
    try {
        let posters = await Poster.REQUEST();
        let posterId = 40000; //first order id is 100, the second will be 101...
        if (posters !== undefined) {
            posterId = parseInt(posters[posters.length - 1]._id) + 1;
        }
        //create the order in the DB
        await Poster.CREATE([
            posterId,
            req.body.name,
            req.body.creator,
            req.body.img,
            req.body.price,
            req.body.measurement,
            req.body.tagList,
            req.body.amount
        ]);

        debug("Poster created")
    } catch (err) {
        debug(err);
        res.send(404);
    }
});
module.exports = router;

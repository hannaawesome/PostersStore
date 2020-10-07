const express = require("express");
const User = require("../models")("User");
const Message = require("../models")("Message");
const Order = require("../models")("Order");
const Poster = require("../models")("Poster");
const router = express.Router();
const debug = require("debug")("TheProject:add_to_cart");
const connectEnsureLogin = require("connect-ensure-login");
router.post("/", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    try {
        let user = await User.findOne({
            _id: req.body._id,
            active: true
        }).exec();
        if (user === undefined) {
            debug("error in finding user");
            res.send(404)
        }
        let posterId = req.body.posterId;
        let amount = req.body.amount;
        let measurementChosen = req.body.measurement;
        let poster = await Poster.findOne({
            _id: posterId,
            active: true
        }).exec();

        let cart = user.cartItems;
        if (poster === undefined) {
            res.send(404);
        } else {
            if (cart === undefined) cart = [];
            //if (
            //    cart === [] ||
             //   cart.findIndex((item) => item.posterId === posterId) === -1
            //) {
                cart.push({
                    posterId: posterId,
                    amount: amount,
                    measurement: {width: measurementChosen.width, length: measurementChosen.length}
                });
                user.cartItems = cart;
                await User.UPDATE(user);
                debug("successfully added to cart");
                res.send(200);
            //}
        }
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});
module.exports = router;

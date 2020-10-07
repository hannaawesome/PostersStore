const express = require("express");
const User = require("../models")("User");
const Message = require("../models")("Message");
const Order = require("../models")("Order");
const Poster = require("../models")("Poster");
const router = express.Router();
const debug = require("debug")("TheProject:UpdatePosterCartAmount");
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
        let width = req.body.measurement.width;
        let length=req.body.measurement.length;

        let poster = await Poster.findOne({
            _id: posterId,
            active: true
        }).exec();

        let cart = user.cartItems;
        if (poster === undefined) {
            res.send(404);
        } else {
            let poster = cart.findIndex((item) => item.posterId === posterId);
            if (
                cart === [] ||
                poster === -1
            ) {
                debug("ERROR no such poster in cart");
                res.send(404);
            }
            else {
                cart[poster].measurement.width = width;
                cart[poster].measurement.length = length;
                user.cartItems = cart;
                await User.UPDATE(user);
                debug("successfully updated in cart");
                res.send(200);
            }
        }
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});
module.exports = router;

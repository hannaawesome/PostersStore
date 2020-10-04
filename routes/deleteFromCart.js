const express = require("express");
const poster = require("../models/Poster");
const router = express.Router();
const User = require("../models")("User");
const debug = require("debug")("TheProject:delete_from_cart");
const connectEnsureLogin = require("connect-ensure-login");
router.post("/", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    try {
        let user = await User.findOne({
            _id: req.body._id,
            active: true,
        }).exec();
        if(user===undefined) {
            debug("error in finding user");
            res.send(404)
        }
        let posterId = req.body.posterId;

        let poster = await Poster.findOne({
            _id: posterId,
            active: true
        }).exec();

        let cart = user.cartItems;
        if (poster === undefined) {
            debug("ERROR poster does not exist");
            res.send(404);
        } else {
            if (cart === undefined) res.send(404);

            let poster = cart.findIndex((item) =>item.posterId === posterId);
            if(poster=== -1){
                debug("ERROR poster does not exist in cart");
                res.send(404);
            }
            cart.remove(poster);
            user.cartItems=cart;
            await User.UPDATE(user);
            debug("poster deleted successfully");
            res.send(200);
        }
    } catch (err) {
        debug(err);
        res.send(404);
    }
});
module.exports = router;

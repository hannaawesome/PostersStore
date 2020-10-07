var express = require('express');
var router = express.Router();
const User = require("../models")("User");
const Message = require("../models")("Message");
const Order = require("../models")("Order");
const Poster = require("../models")("Poster");
const debug = require('debug')('TheProject:updateUserDetails');
const passport = require("passport");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.post("/", async function (req, res) {
    let user = {
        _id: req.body._id,
        fullname: {
            fname: req.body.fname,
            lname: req.body.lname
        },
        phone: req.body.phone,
        e_mail: req.body.e_mail,
        category: req.body.category,
        bnumber: req.body.bnumber,
        cartItems: req.body.cartItems,
        orderHistory: req.body.orderHistory,
        likedItems: req.body.likedItems
    };

    try {
        await User.UPDATE(user, req.body.password, function (err, user) {
            if (err) {
                debug("Update error")
            }
        });
        debug("User was updated");
    } catch (err) {
        debug("User updated error");
        res.send(404);
    }
    setTimeout((function () {
        res.status(200).send()
    }), 6000);
});
module.exports = router;

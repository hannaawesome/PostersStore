var express = require('express');
var router = express.Router();
const User = require("../models")("User");
const Message = require("../models")("Message");
const Order = require("../models")("Order");
const Poster = require("../models")("Poster");
const debug = require('debug')('TheProject:addUser');
const passport = require("passport");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.post("/", async function (req, res) {
    let usersList = await User.REQUEST();
    let user = {
        _id: usersList.length.toString(),
        fullname: {
            fname: req.body.fullname.fname,
            lname: req.body.fullname.lname
        },
        phone:-1,
        e_mail: req.body.e_mail,
        category: req.body.category,
        cartItems: [],
        orderHistory: [],
        likedItems: [],
        active:true
    };
    try {
        await User.register(user, req.body.password, function (err, user) {
            if (err) {
                debug("Register error")
            }
        });
        debug("User was created");
    } catch (err) {
        debug("User created error")
    }
    setTimeout((function () {
        res.status(200).send()
    }), 6000);
});
module.exports = router;

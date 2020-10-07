const express = require("express");
const User = require("../models")("User");
const Message = require("../models")("Message");
const Order = require("../models")("Order");
const Poster = require("../models")("Poster");
const router = express.Router();
const debug = require("debug")("TheProject:GetUsers");

router.get("/", async function (req, res) {
        let users = await User.find({active: true}).exec();
    if (users === undefined||users === ""||users===null) {
        debug("no users found");
        users=[];
        await res.json(users);
    }else
        await res.json(
            users.map((user) => {
                return {
                    _id: user._id,
                    e_mail: user.e_mail,
                    fullname: {
                        fname: user.fullName.fName,
                        lname: user.fullName.lName
                    },
                    phone: user.phone,
                    category: user.category
                };
            }));
    }
);
module.exports = router;

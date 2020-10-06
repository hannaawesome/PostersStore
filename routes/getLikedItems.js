const express = require("express");
const Poster = require("../models/Poster");
const User = require("../models")("User");
const router = express.Router();
const debug = require("debug")("TheProject:get_liked_items");
const connectEnsureLogin = require("connect-ensure-login");
router.get("/", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    let user = await User.findOne({
        _id: req.query.id,
        active: true,
    }).exec();
    if (user === undefined) {
        debug("error in finding user");
        res.send(404)
    }
    let liked = user.likedItems;
    let posters = await Poster.find({active: true}).exec();
    if (liked !== undefined) {
        res.json(
            posters.map((p) => {
                if (liked.findIndex((item) => item === p._id) !== -1)
                    return {
                        _id: p._id,
                        name: p.name,
                        creator: p.creator,
                        img: p.img,
                        type_of_image: p.type_of_image,
                        price: p.price,
                        measurement: {
                            width: p.measurement.width,
                            length: p.measurement.length
                        },
                        tagList: p.tagList,
                        liked: true
                    };
                else {
                    return {
                        _id: p._id,
                        name: p.name,
                        creator: p.creator,
                        img: p.img,
                        type_of_image: p.type_of_image,
                        price: p.price,
                        measurement: {
                            width: p.measurement.width,
                            length: p.measurement.length
                        },
                        tagList: p.tagList,
                        liked: false
                    };
                }
            })
        );
    }
});
module.exports = router;

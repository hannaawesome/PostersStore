const express = require("express");
const Poster = require("../models/Poster");
const router = express.Router();
const User = require("../models")("User");
const debug = require("debug")("TheProject:add_to_liked");
const connectEnsureLogin = require("connect-ensure-login");
router.post("/", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    try {
        let user = await User.findOne({
            _id: req.body._id,
            active: true
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

        let liked = user.likedItems;
        if (poster === undefined) {
            res.send(404);
        } else {
            if (liked === undefined) cart = [];
            if (
                liked === [] ||
                liked.findIndex((item) => item.posterId === posterId) === -1
            ) {
                liked.push({ posterId: posterId });
                user.likedItems=liked;
                await User.UPDATE(user);
                debug("successfully added to liked");
                res.send(200);
            } else res.send(404);
        }
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});
module.exports = router;

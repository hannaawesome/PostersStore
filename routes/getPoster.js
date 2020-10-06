const express = require("express");
const Poster = require("../models/Poster");
const router = express.Router();
const debug = require("debug")("TheProject:GetPoster");
const connectEnsureLogin = require("connect-ensure-login");

router.get("/", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
        let poster = await Poster.findOne({
            _id: req.query.Id,
            active: true,
        }).exec();
        res.json(poster);
    }
);
module.exports = router;

const express = require("express");
const User = require("../models/User");
const router = express.Router();
const debug = require("debug")("TheProject:GetUser");
const connectEnsureLogin = require("connect-ensure-login");

router.get("/", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
        let user = await User.findOne({
            _id: req.query.id,
            active: true,
        }).exec();
        res.json(user);
    }
);
module.exports = router;

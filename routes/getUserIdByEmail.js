const express = require("express");
const User = require("../models/User");
const router = express.Router();
const debug = require("debug")("TheProject:GetUserIdByEmail");
const connectEnsureLogin = require("connect-ensure-login");

router.get("/", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
        let user = await User.findOne({
            e_mail: req.query.e_mail,
            active: true,
        }).exec();
        res.json(user._id);
    }
);
module.exports = router;

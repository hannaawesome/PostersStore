var express = require('express');
var router = express.Router();
const User = require("../models")("User");
const passport = require("passport");

const debug = require('debug')('TheProject:login');
router.post("/", (req, res, next) => {
    passport.authenticate(["User"], (err, user, info) => {
        if (err) {
            debug("ERROR " + err);
            res.send(404);
        } else if (!user) {
            debug("User is NULL" + user);
            res.send(404);
        } else {
            req.login(user, function (err) {
                if (err) {
                    debug("ERROR while login" + err);
                    res.send(404);
                } else res.send(200);
            });
        }
    })(req, res, next);
});
module.exports = router;

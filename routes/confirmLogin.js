var express = require('express');
var router = express.Router();
const User = require('../models')("User");
const passport = require('passport');
const debug = require('debug')('TheProject:login');
var decrypt = require("./decrypt");
var users=[];

/* POST confirmLogin. */
/*router.post('/', async function(req, res, next) {
    req.body.password = await decrypt(req.body.password);
    next();
})
*/
router.post('/', async function(req, res,next) {//passport.authenticate('local')
    var session = req.session;
    let user;
    try {
        user = await User.findOne({username: req.body.user}).exec();
    } catch (err) {
        debug(`Login error: ${err}`);
        session.badLogin = "Login error";
        res.redirect(req.session.referer);
        return;
    }
    if (user === null) {
        debug(`Login no user: ${err}`);
        session.badLogin = `User '${req.body.user}' doesn't exist`;
        res.redirect(req.session.referer);
        return;
    }
    if (user.password !== req.body.password) {
        debug(`Login wrong password: ${req.body.password}/${user.password}`);
        session.badLogin = `Wrong password for '${req.body.user}'`;
        res.redirect(req.session.referer);
        return;
    }
    debug(`Logged to: ${user.username}`);
    delete session.badLogin;
    session._id = user._id;
    session.username = user.username;
    session.admin = req.user.category;
    session.count = 0;
    res.redirect(req.session.referer);
    next();
});

module.exports = router;
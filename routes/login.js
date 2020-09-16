var express = require('express');
var router = express.Router();
var User= require('../models')("User");
let debug=require('debug')('TheProject:login');

router.get('/', async (req, res) => {

    if (req.session._id === undefined) {
        req.session.referer = req.get('Referer');
        if (req.session.referer === undefined)
            req.session.referer = '/';
        let users = [];
        try {
            users = await User.REQUEST();
        } catch (err) {
            debug("request users nav error")
        }
        if(!users.length)
            res.render('newAdmin');
        else
            res.render('login');
    }
    else
        res.redirect('/');
});

module.exports = router;
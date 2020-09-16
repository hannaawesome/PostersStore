var express = require('express');
var router = express.Router();
const User = require('../models')("User");
var users = [];

router.get('/', async function(req, res,next) {
    try {
        users = await User.REQUEST();
    } catch (err) {
        console.log("request users nav error")
    }
    var category = "none";
if(users.length) {
    users.forEach(function (user) {
        if (user.user_name == req.query.user_name) {
            category = user.category;
        }
    });
}else
    category="no_user";

    switch (category) {
        case "manager":
            res.render('partials/manager_nav');
            break;
        case "worker":
            res.render('partials/worker_nav');
            break;
        case "customer":
            res.render('partials/customer_nav');
            break;
        case "no_user":
            res.render('partials/no_user_nav');
            break;
        case "none":
            res.render('partials/unregistered_nav');
            break;
        default:
            res.render('partials/unregistered_nav');
            break;
    }
});
module.exports = router;

var express = require('express');
var router = express.Router();
const checksession = require('./checksession');
const debug = require('debug')('TheProject:users');
const User = require('../models')("User");
var users=[];

router.get('/', async function(req, res) {//checksession
    try {
        res.render('users', {title: 'User List', admin: req.session.admin, users: await User.REQUEST()});
    } catch (err) { debug(`get users failure: ${err}`); }

    var category = "none";
    users.forEach(function(user) {
        if (user.user_name == req.query.user_name) {
            category = user.category;
        }
    });

    switch (category) {
        case "manager":
            res.render('manager', {
                userCategory: category,
                usersArray: users
            });
            break;
        case "worker":
            var customers = [];
            users.forEach(function(user) {
                if (user.category == "customer")
                    customers.push(user);
            })
            res.render('worker', {
                userCategory: category,
                usersArray: customers
            });
            break;
        default:
            res.render('worker', {
                userCategory: category,
                usersArray: []
            });
            break;
    }
});
router.get('/add', async (req, res) => {//checksession
    if (!req.session.admin) {
        debug("Must be admin to add a user!!!");
        res.redirect('/users');
    } else
        res.render('add_user', {title: 'Add user', admin: req.session.admin});
});

router.get('/delete/:name', async (req, res) => {//checksession
    if (!req.session.admin)
        debug("Must be admin to delete a user or can't delete THE ADMIN!!!");
    else {
        res.render('delete_user', {title: 'Delete user', admin: req.session.admin});

    }
    res.redirect('/users');
});

module.exports = router;

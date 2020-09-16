var express = require('express');
var router = express.Router();
const User = require('../models')("User");

router.post('/',async function(req, res,next) {
    let user = {
        user_name: req.body.user_name,
        password: req.body.password,
        fullname: {
            fname: req.body.fname,
            lname: req.body.lname
        },
        address: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state
        },
        phone: req.body.phone,
        mail: req.body.mail,
        category: req.body.category,
        bnumber: req.body.bnumber
    };

    try {
        await User.CREATE(user);
        console.log("User was created");
    } catch (err) {  console.log("User created error") }
    setTimeout((function() {res.status(200).send()}), 6000);
});
module.exports = router;

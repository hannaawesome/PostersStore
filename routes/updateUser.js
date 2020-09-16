var express = require('express');
var router = express.Router();
const User = require('../models')("User");

router.post('/',async function(req, res,next) {
    let update_user = {
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
        category: "",
        bnumber: ""
    };
    try {
        await User.UPDATE(update_user);
    }
    catch(err){
        console.log("could not update");
    }

    setTimeout((function() {res.status(200).send()}), 1000);
});
module.exports = router;

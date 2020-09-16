var express = require('express');
var router = express.Router();
const User = require('../models')("User");

router.post('/',async function(req, res,next) {
    let update_user = {
        user_name: req.body.user_name,
        password: req.body.password,
        fullname: {
            fname:"" ,
            lname: ""
        },
        address: {
            street: "",
            city: "",
            state: ""
        },
        phone: "",
        mail: "",
        category: req.body.category,
        bnumber: req.body.bnumber
    };
    try{
        await User.UPDATE_STATUS(update_user);
    }catch(err){
        console.log(err);
    }
    setTimeout((function() {res.status(200).send()}), 1000);
});
module.exports = router;

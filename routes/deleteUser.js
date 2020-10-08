var express = require('express');
var router = express.Router();
const User = require("../models/user");
router.post('/',async function(req, res,next) {
    try {
        await User.DELETE(req.body.email);
    }
    catch(err){
        console.log("could not delete");
    }
    setTimeout((function() {res.status(200).send()}), 1000);
});
module.exports = router;


var express = require('express');
var router = express.Router();
const Branch = require('../models')("Branch");

router.post('/',async function(req, res,next) {
    try {
        await Branch.DELETE(req.body.bnumber);
    }
    catch(err){
        console.log("could not delete branch");
    }
    setTimeout((function() {res.status(200).send()}), 1000);
});
module.exports = router;


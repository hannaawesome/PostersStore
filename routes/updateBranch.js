var express = require('express');
var router = express.Router();
const Branch = require('../models')("Branch");

router.post('/',async function(req, res,next) {
    let update_branch = {
        bnumber: req.body.bnumber,
        address: {
            number: req.body.number,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state
        },
        phone: req.body.phone,
       active:req.body.active
    };
    try {
        await Branch.UPDATE(update_branch);
    }
    catch(err){
        console.log("could not update");
    }

    setTimeout((function() {res.status(200).send()}), 1000);
});
module.exports = router;

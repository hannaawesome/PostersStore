var express = require('express');
var router = express.Router();
const Branch = require('../models')("Branch");

router.post('/', async function(req, res,next) {
    let branch = {
        address: {
            number: req.body.number,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state
        },
        bnumber: req.body.bnumber,
        phone: req.body.phone,
        active: req.body.active
    };
    try {
        await Branch.CREATE(branch);
        console.log("Branch was added");
    } catch (err) {  console.log("Branch created error") }
    setTimeout((function() {res.status(200).send()}), 1000);
});
module.exports = router;

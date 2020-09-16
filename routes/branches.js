var express = require('express');
var router = express.Router();
const Branch = require('../models')("Branch");
var branches = [];

router.get('/',async function(req, res,next) {

    try {
        branches = await Branch.REQUEST();
    } catch (err) {
        console.log("request branches error")
    }
    res.render('branches', {branchesArray : branches});
});
module.exports = router;

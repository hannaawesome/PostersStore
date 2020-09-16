var express = require('express');
var router = express.Router();
const Branch = require('../models')("Branch");
var branches = [];
router.get('/', async function(req, res,next) {
    try {
        branches = await Branch.REQUEST();
    } catch (err) {
        console.log("request branch error")
    }
    let bnumbers = [];
    branches.forEach(function(branch) {
        if(branch.active) {
            bnumbers.push(branch.bnumber);
        }
    });
    res.json(bnumbers);
});
module.exports = router;


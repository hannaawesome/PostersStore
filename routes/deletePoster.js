var express = require('express');
var router = express.Router();
const User = require("../models")("User");
const Message = require("../models")("Message");
const Order = require("../models")("Order");
const Poster = require("../models")("Poster");
router.post('/',async function(req, res,next) {
    try {
        await Poster.DELETE(req.body._id);
    }
    catch(err){
        console.log("could not delete poster "+err);
    }
    setTimeout((function() {res.status(200).send()}), 1000);
});
module.exports = router;


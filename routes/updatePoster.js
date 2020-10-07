var express = require('express');
var router = express.Router();
const User = require("../models")("User");
const Message = require("../models")("Message");
const Order = require("../models")("Order");
const Poster = require("../models")("Poster");
router.post('/', async function(req, res,next) {
    let update_poster = {
        _id:req.body._id,
        name: req.body.name,
        creator: req.body.creator,
        img: req.body.img,
        price: req.body.price,
        measurement:{
            width:req.body.measurement.width,
            length:req.body.measurement.length,
        },
        tagList:req.body.tagList,
        amount:req.body.anount,
    };
    try {
        await Poster.UPDATE(update_poster);
        console.log("Poster was updated");
    } catch (err) {  console.log("could not update poster price "+err) }
    setTimeout((function() {res.status(200).send()}), 1000);
});
module.exports = router;
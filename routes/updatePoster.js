var express = require('express');
var router = express.Router();
const Poster = require('../models')("Poster");
router.post('/', async function(req, res,next) {
    let update_poster = {
        name: req.body.name,
        creator: "",
        img: "",
        type_of_image:"",
        price: req.body.price
    };
    try {
        await Poster.UPDATE(update_poster);
        console.log("Poster was updated");
    } catch (err) {  console.log("could not update poster price "+err) }
    setTimeout((function() {res.status(200).send()}), 1000);
});
module.exports = router;
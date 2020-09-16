var express = require('express');
var router = express.Router();
const Poster = require('../models')("Poster");
var posters = [];

router.get('/', async function(req, res,next) {
    try {
        posters = await Poster.REQUEST();
    } catch (err) {
        console.log("request posters error")
    }
    res.render('worker_catalog', {
        postersArray: posters
    });
});
module.exports = router;

var express = require('express');
var router = express.Router();
const Poster = require('../models')("Poster");
var multer = require('multer');
var fs = require('fs');
const image2base64 = require('image-to-base64');
var upload = multer({ dest: 'uploads/' });
router.post('/', upload.single('posterImg'), function(req, res, next) {
    if (req.body.fileOrLink == "file") {
        var img = fs.readFileSync(req.file.path);
        req.body.type_of_image = req.file.mimetype;
        req.body.img = img.toString('base64');
    }
    next();
});
router.post('/', async function(req, res, next) {
    if (req.body.fileOrLink == "url") {
        await image2base64(req.body.posterImgUrl)
            .then((response) => {
                req.body.img = response;
            })
            .catch((error) => {
                console.log("error addPoster url");
            })
        req.body.type_of_image = "image/png";

    }
    next();
});
router.post('/', async function(req, res,next) {
    let poster = {
        name: req.body.name,
        creator: req.body.creator,
        img: req.body.img,
        type_of_image:req.body.type_of_image,
        price: req.body.price
    };
    try {
        await Poster.CREATE(poster);
        console.log("Poster was added");
    } catch (err) {  console.log("Poster created error "+err) }
    setTimeout((function() {res.status(200).send()}), 1000);
});
module.exports = router;

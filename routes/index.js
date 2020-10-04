var express = require('express');
var router = express.Router();

const debug = require('debug')('TheProject:index');
/* GET home page. */

router.get('/',function (req, res,next) {
    res.render('index');
});

router.post('/', function (req, res, next) {
    res.render('index');
});
// function SessionConstructor(userId, catagory, details) {
//     this.userId = userId;
//     this.catagory = catagory;
//     this.details = details;
// }


module.exports = router;

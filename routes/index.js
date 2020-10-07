var express = require('express');
var router = express.Router();
const path = require('path');

const debug = require('debug')('TheProject:index');
/* GET home page. */

router.get('/',function (req, res,next) {
    res.render('index', { title: 'ip-poster server' });
});

router.post('/', function (req, res, next) {
    res.render('index', { title: 'in-poster server' });
});
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../in-poster/build/index.html'));
});
// function SessionConstructor(userId, catagory, details) {
//     this.userId = userId;
//     this.catagory = catagory;
//     this.details = details;
// }


module.exports = router;

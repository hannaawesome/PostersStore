var express = require('express');
var router = express.Router();
const path = require('path');

const debug = require('debug')('TheProject:index');
/* GET home page. */

router.get('/',function (req, res,next) {
    // User.register(
    //     {
    //         _id: "12388888",
    //         firstName: "Shosh",
    //         lastName: "Bar",
    //         e_mail: "s@gmail.com",
    //         category: "Customer",
    //         image: "",
    //         cartItems: [],
    //         orderHistory: [],
    //         likedItems: [],
    //
    //     },
    //     "123",
    //     function (err, user) {
    //         if (err) {
    //             console.log(err);
    //         }
    //     }
    // );
    res.render('index', { title: 'ip-poster server' });
});

router.post('/', function (req, res, next) {
    res.render('index', { title: 'in-poster server' });
});
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../in-poster/build/index.html'));
});


module.exports = router;

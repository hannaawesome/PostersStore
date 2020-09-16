var express = require('express');
var router = express.Router();
const itemInCart = require('../models')("ItemInCart");
const Cart = require('../models')("Cart");

/* POST empty the user cart. */
router.post('/', async function (req, res, next) {
    try {

        let cart = await Cart.findOneAndUpdate(
            { "user": req.session._id },
            {
                "$set": {
                    "itemsInCart": []
                }
            });
        console.log("changed quantity of item");
    } catch (err) {
        console.log(`Failure ${err}`);
    }
    setTimeout((function () {
        res.status(200).send()
    }), 1000);
});

module.exports = router;
var express = require('express');
var router = express.Router();
const Poster = require('../models')("Poster");
const Cart = require('../models')("Cart");
const ItemInCart = require('../models')("ItemInCart");

var posters = [];
var itemsInCart = [];
var total;

/* GET store page. */
router.get('/', async function (req, res, next) {
    if (req.session.category === undefined) {
        res.status(401).send();
        return;
    }
    try {
        posters = await Poster.REQUEST();
        userCart = await Cart.findOne({ user: req.session._id });
        if (userCart) {
            const diff = Date.now() - Date.parse(userCart.createdAt);
            minutesDiff = Math.round(diff / 60000);
            if (minutesDiff >= 15) {
                userCart.itemsInCart = [];
                userCart.createdAt = Date.now();
                await userCart.save();
            }
            else {
                itemsInCart = userCart.itemsInCart;
            }
        } else {
            itemsInCart = [];
        }

        total = 0;
        for (var i = 0; i < itemsInCart.length; i++) {
            total = total + (itemsInCart[i].quantity * itemsInCart[i].price);
        }
    } catch (err) {
        console.log("request error")
    }
    res.render('store', {
        title: 'Express',
        postersArray: posters,
        itemsInCartArray: itemsInCart,
        total: total
    });
});

module.exports = router;

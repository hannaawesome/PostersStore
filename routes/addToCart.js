var express = require('express');
var router = express.Router();
const Cart = require('../models')("Cart");
const ItemInCart = require('../models')("ItemInCart");


router.post('/', async function(req, res,next) {
    let itemInCart = {
        name: req.body.name,
        imageContentType: req.body.imageContentType,
        imageData: req.body.imageData,
        price: req.body.price,
        quantity: req.body.quantity
    };
    try {
        let cart = await Cart.findOne({ user: req.session._id });
        let newCart = false;
        let minutesDiff = 0;
        if (!cart) {
            cart = await Cart.create({ user: req.session._id });
            newCart = true;
        } else {
            const createDate = new Date(cart.createdAt);
            const diff = Date.now() - createDate;
            minutesDiff = Math.round(diff / 60000);
        }
        if (minutesDiff >= 15 || newCart) {
            cart.itemsInCart = [itemInCart];
            cart.createdAt = Date.now();
        }
        else {
            let newItemsInCart = cart.itemsInCart;
            newItemsInCart.push(itemInCart);
            cart.itemsInCart = newItemsInCart;
        }
        await cart.save();
        console.log("item was added to cart");
    } catch (err) {  console.log("item adding to cart error") }
    setTimeout((function() {res.status(200).send()}), 1000);
});
module.exports = router;

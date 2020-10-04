var express = require('express');
var router = express.Router();
const Order = require("../models")("Order");
const User = require("../models")("User");

const connectEnsureLogin = require("connect-ensure-login");
const debug = require('debug')('TheProject:addOrder');
router.post("/", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    try {
        let user_id = req.body._id;
        let user = await User.findone({
            _id: user_id,
            active: true
        }).exec();
        if(user===undefined) {
            debug("error in finding user");
            res.send(404)
        }
        let orderItemList = req.body.cartItems;
        let address = req.body.shipmentAddress;
        let totalPrice = req.body.totalPrice;
        //calculate the order id
        let orders = await Order.REQUEST();
        let orderId = 10000; //first order id is 100, the second will be 101...
        if (orders !== undefined) {
            orderId = parseInt(orders[orders.length - 1]._id) + 1;
        }

        //create the order in the DB
        await Order.CREATE([
            orderId,
            user._id,
            orderItemList,
            address,
            totalPrice
        ]);
        user.orderHistory.push({orderId:orderId});
        User.UPDATE(user);
        res.json(orderId); //need to send the order id to the client?????????????????????????????????????
        debug("order created")
    } catch (err) {
        debug(err);
        res.send(404);
    }
});
module.exports = router;

const express = require("express");
const Order = require("../models/Order");
const User = require("../models")("User");
const router = express.Router();
const debug = require("debug")("TheProject:get_user_orders");
const connectEnsureLogin = require("connect-ensure-login");
router.get("/", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    let user = await User.findOne({
        _id: req.body._id,
        active: true,
    }).exec();
    if (user === undefined) {
        debug("error in finding user");
        res.send(404)
    }
    let orderHist = user.orderHistory;
    let orders = await Order.find({active: true}).exec();
    if (orders !== undefined) {
        res.json(
            orders.map((order) => {
                    if (orderHist.findIndex((item) => item === order._id) !== -1)
                        return {
                            id: order._id,
                            itemsInOrder: order.itemsInOrder,
                            shipmentAddress: {
                                street: order.shipmentAddress.street,
                                city: order.shipmentAddress.city,
                                state: order.shipmentAddress.state
                            },
                            totalPrice: order.totalPrice,
                            createdAt: order.createdAt,
                        };
                }
            ));
    }
});
module.exports = router;

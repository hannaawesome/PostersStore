const express = require("express");
const User = require("../models")("User");
const Message = require("../models")("Message");
const Order = require("../models")("Order");
const Poster = require("../models")("Poster");
const router = express.Router();
const debug = require("debug")("TheProject:cancel_Order");
const connectEnsureLogin = require("connect-ensure-login");
router.post("/", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    try {
        let user = await User.findOne({
            _id: req.body.user_id,
            active: true,
        }).exec();
        if (user === undefined) {
            debug("error in finding user");
            res.send(404)
        }
        let orderId = req.body.id;

        let order = await Order.findOne({
            _id: orderId,
            active: true
        }).exec();

        let ordersList = user.orderHistory;
        if (order === undefined) {
            debug("ERROR order does not exist");
            res.send(404);
        } else {
            if (ordersList === undefined) res.send(404);

            let orderIndex = ordersList.findIndex((item) => item.orderId === orderId);
            if (orderIndex === -1) {
                debug("ERROR order does not exist in cart");
                res.send(404);
            }
            ordersList.remove(orderIndex);
            Order.DELETE(order);
            user.orderHistory = ordersList;
            await User.UPDATE(user);
            debug("order canceled successfully");
            res.send(200);
        }
    } catch (err) {
        debug(err);
        res.send(404);
    }
});
module.exports = router;

const express = require("express");
const router = express.Router();
const debug = require("debug")("TheProject:GetOrders");
const connectEnsureLogin = require("connect-ensure-login");
const User = require("../models")("User");
const Message = require("../models")("Message");
const Order = require("../models")("Order");
const Poster = require("../models")("Poster");
router.get("/", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    let orders = await Order.find({active: true}).exec();
    res.json(
        orders.map((order) => {
            return {
                _id: order._id,
                user_id: order.user_id,
                itemsInOrder:order.itemsInOrder,
                shipmentAddress:{
                    street: order.shipmentAddress.street,
                    city: order.shipmentAddress.city,
                    state: order.shipmentAddress.state
                },
                totalPrice: order.totalPrice,
                createdAt: order.createdAt,

            };
        }));
    }
);
module.exports = router;

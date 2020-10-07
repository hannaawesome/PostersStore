const express = require("express");
const User = require("../models")("User");
const Message = require("../models")("Message");
const Order = require("../models")("Order");
const Poster = require("../models")("Poster");
const router = express.Router();
const debug = require("debug")("TheProject:GetPosters");
router.get("/", async function (req, res) {
        let posters = await Poster.find({active: true}).exec();
        if (posters === undefined||posters === ""||posters===null) {
            debug("no posters found");
            posters=[];
            await res.json(posters);
        }else
            await res.json(
                posters.map((poster) => {
                    return {
                        _id: poster._id,
                        name: poster.name,
                        creator: poster.creator,
                        img: poster.img,
                        price: poster.price,
                        measurement:{
                            width:poster.measurement.width,
                            length:poster.measurement.length
                        },
                        tagList:poster.tagList,
                        amount:poster.amount,
                    };
                }));
    }
);
module.exports = router;

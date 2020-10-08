var express = require('express');
var router = express.Router();
const User = require("../models")("User");
const Message = require("../models")("Message");
const Order = require("../models")("Order");
const Poster = require("../models")("Poster");
const Chatroom=require("../models")("Chatroom");
const connectEnsureLogin = require("connect-ensure-login");
const passport = require("passport");
const debug = require("debug")("router");
const { catchErrors } = require("../handlers/errorHandlers");
const auth = require("./auth");


passport.use("User",User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.get("/get_chatrooms", catchErrors(async function (req, res) {
    const chatrooms = await Chatroom.find({});

    res.json(chatrooms);
}));
router.post("/add_chatroom",auth ,catchErrors(async function (req, res) {
    const { name } = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

    const chatroomExists = await Chatroom.findOne({ name });

    if (chatroomExists) throw "Chatroom with that name already exists!";

    const chatroom = new Chatroom({
        name,
    });

    await chatroom.save();

    res.json({
        message: "Chatroom created!",
    });
}));
router.get("/get_messages", catchErrors(async function (req, res) {
    const messages = await Message.find({});

    res.json(messages);
}));
router.post("/update_like_to_message",auth ,catchErrors(async function (req, res) {
    const { massageId,userAdded,likeStatus,unlikeStatus} = req.body;
    let user = await User.findOne({
        e_mail: userAdded,
        active: true
    }).exec();
    if(user===undefined) {
        debug("error in finding user");
        res.send(404)
    }
    const message = await Message.findOne({ massageId });

    if (message===undefined) console.log("ERROR message not found!");
    const likes=message.likes;
    const unlikes=message.unlikes;

    if((likes.findIndex((item) => item.userEmail === userAdded) === -1&&!likeStatus)||(likes.findIndex((item) => item.userEmail === userAdded) !== -1&&likeStatus)) {
        console.log("ERROR in like");
        res.send(404);
    }
    if((unlikes.findIndex((item) => item.userEmail === userAdded) === -1&&!unlikeStatus)||(unlikes.findIndex((item) => item.userEmail === userAdded) !== -1&&unlikeStatus)) {
        console.log("ERROR in unlike");
        res.send(404);
    }
    if (likeStatus) {
        if(unlikes.findIndex((item) => item.userEmail === userAdded) !== -1)
        {
            console.log("ERROR in adding like, already exist in unlikes");
            res.send(404);
        }
        likes.push({userEmail: userAdded});
    } else
        likes.remove(likes.findIndex((item) => item.userEmail === userAdded));
    if (unlikeStatus) {
        if(likes.findIndex((item) => item.userEmail === userAdded) !== -1)
        {
            console.log("ERROR in adding unlike, already exist in likes");
            res.send(404);
        }
        unlikes.push({userEmail: userAdded});
    } else
        unlikes.remove(unlikes.findIndex((item) => item.userEmail === userAdded));
    message.likes = likes;
    message.unlikes = unlikes;
    await Message.UPDATE(message);
                debug("successfully added to liked");
                res.send(200);
}));
router.post("/add_user",catchErrors(async function (req, res) {
    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

    if (!emailRegex.test(req.body.e_mail)) throw "Email is not supported from your domain.";
    if (req.body.password.length < 6) throw "Password must be at least 6 characters long.";

    console.log("trying to add");
    let usersList = await User.REQUEST();
    let user = {
        _id: usersList.length.toString(),
        fullName: {
            fName: req.body.fullName.fName,
            lName: req.body.fullName.lName
        },
        phone:-1,
        e_mail: req.body.e_mail,
        category: req.body.category,
        cartItems: [],
        orderHistory: [],
        likedItems: [],
        active:true
    };
    try {
        //User.CREATE(user);
        await User.register(user, req.body.password, function (err, user) {

            if (err) {
                debug("Register error")
            }
        });
        debug("User was created");
    } catch (err) {
        debug("User created error")
    }
    setTimeout((function () {
        res.status(200).send()
    }), 6000);
}));
router.post("/register", catchErrors(async function (req, res) {
    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

    if (!emailRegex.test(req.body.e_mail)) throw "Email is not supported from your domain.";
    if (req.body.password.length < 6) throw "Password must be at least 6 characters long.";

    let usersList = await User.REQUEST();
    let user = {
        _id: usersList.length.toString(),
        fullName: {
            fName: req.body.fName,
            lName: req.body.lName
        },
        phone:-1,
        e_mail: req.body.e_mail,
        category: usersList.length.toString()?'Customer':"Admin",
        cartItems: [],
        orderHistory: [],
        likedItems: []
    };

    try {
         await User.register(user, req.body.password, function (err, user) {
             if (err) {
                 debug("Register error")
             }
         });
        debug("User was created");
    } catch (err) {
        debug("User created error")
    }
    setTimeout((function () {
        res.status(200).send()
    }), 6000);
}));
router.post("/login", (req, res, next) => {
    passport.authenticate(["User"], (err, user, info) => {
        if (err) {
            console.log("ERROR " + err);
            res.send(404);
        } else if (!user) {
            console.log("User is NULL ");
            res.send(404);
        }
        else if (!user.active) {
                console.log("User is inactive ");
                res.send(404);}
        else {
            req.login(user, function (err) {
                if (err) {
                    console.log("ERROR while login" + err);
                    res.send(404);
                } else res.send(200);
            });
        }
    })(req, res, next);
});
router.post("/add_order", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    try {

        let user = await User.findone({
            e_mail: req.body.email,
            active: true
        }).exec();
        if(user===undefined) {
            debug("error in finding user");
            res.send(404)
        }
        let orderItemList = user.cartItems;
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
            req.body.email,
            orderItemList,
            address,
            totalPrice
        ]);
        user.orderHistory.push({orderId:orderId});
        User.UPDATE(user);
        debug("order created")
    } catch (err) {
        debug(err);
        res.send(404);
    }});

router.post('/add_poster', async function(req, res,next) {
    try {
        let posters = await Poster.REQUEST();
        let posterId = 40000; //first order id is 100, the second will be 101...
        if (posters !== undefined) {
            posterId = parseInt(posters[posters.length - 1]._id) + 1;
        }
        //create the order in the DB
        await Poster.CREATE([
            posterId,
            req.body.name,
            req.body.creator,
            req.body.img,
            req.body.price,
            req.body.measurement,
            req.body.tagList,
            req.body.amount
        ]);

        debug("Poster created")
    } catch (err) {
        debug(err);
        res.send(404);
    }
});
router.post("/add_to_cart", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    try {
        let user = await User.findOne({
            e_mail: req.body.email,
            active: true
        }).exec();
        if (user === undefined) {
            debug("error in finding user");
            res.send(404)
        }
        let posterId = req.body.posterId;
        let amount = req.body.amount;
        let measurementChosen = req.body.measurement;
        let poster = await Poster.findOne({
            _id: posterId,
            active: true
        }).exec();

        let cart = user.cartItems;
        if (poster === undefined) {
            res.send(404);
        } else {
            if (cart === undefined) cart = [];
            //if (
            //    cart === [] ||
            //   cart.findIndex((item) => item.posterId === posterId) === -1
            //) {
            cart.push({
                posterId: posterId,
                amount: amount,
                measurement: {width: measurementChosen.width, length: measurementChosen.length}
            });
            user.cartItems = cart;
            await User.UPDATE(user);
            debug("successfully added to cart");
            res.send(200);
            //}
        }
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});
router.post("/update_liked", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    try {
        let user = await User.findOne({
            e_mail: req.body.email,
            active: true
        }).exec();
        if(user===undefined) {
            debug("error in finding user");
            res.send(404)
        }
        let posterId = req.body.posterId;
        let isLiked=req.body.liked;
        let poster = await Poster.findOne({
            _id: posterId,
            active: true
        }).exec();

        let liked = user.likedItems;
        if (poster === undefined) {
            res.send(404);
        } else {
            if (liked === undefined && isLiked === false) {
                console.log("ERROR in liked");
                res.send(404);
            } else if (
                liked === [] ||
                liked.findIndex((item) => item.posterId === posterId) === -1 && !isLiked) {
                console.log("ERROR in liked");
                res.send(404);
            } else {
                if (isLiked) {
                    liked.push({posterId: posterId});
                } else
                    liked.remove(liked.findIndex((item) => item.posterId === posterId));
                    user.likedItems = liked;
                await User.UPDATE(user);
                debug("successfully added to liked");
                res.send(200);
            }
        }
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

router.post("/delete_from_cart", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    try {
        let user = await User.findOne({
            e_mail: req.body.email,
            active: true,
        }).exec();
        if(user===undefined) {
            debug("error in finding user");
            res.send(404)
        }
        let posterId = req.body.posterId;

        let poster = await Poster.findOne({
            _id: posterId,
            active: true
        }).exec();

        let cart = user.cartItems;
        if (poster === undefined) {
            debug("ERROR poster does not exist");
            res.send(404);
        } else {
            if (cart === undefined) res.send(404);

            let poster = cart.findIndex((item) =>item.posterId === posterId);
            if(poster=== -1){
                debug("ERROR poster does not exist in cart");
                res.send(404);
            }
            cart.remove(poster);
            user.cartItems=cart;
            await User.UPDATE(user);
            debug("poster deleted successfully");
            res.send(200);
        }
    } catch (err) {
        debug(err);
        res.send(404);
    }
});

router.get("/get_liked_items", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    let user = await User.findOne({
        e_mail: req.body.email,
        active: true,
    }).exec();
    if (user === undefined) {
        debug("error in finding user");
        res.send(404)
    }
    let liked = user.likedItems;
    let posters = await Poster.find({active: true}).exec();
    if (liked !== undefined) {
        res.json(
            posters.map((p) => {
                if (liked.findIndex((item) => item === p._id) !== -1)
                    return {
                        _id: p._id,
                        name: p.name,
                        creator: p.creator,
                        img: p.img,
                        type_of_image: p.type_of_image,
                        price: p.price,
                        measurement: {
                            width: p.measurement.width,
                            length: p.measurement.length
                        },
                        tagList: p.tagList,
                        liked: true
                    };
                else {
                    return {
                        _id: p._id,
                        name: p.name,
                        creator: p.creator,
                        img: p.img,
                        type_of_image: p.type_of_image,
                        price: p.price,
                        measurement: {
                            width: p.measurement.width,
                            length: p.measurement.length
                        },
                        tagList: p.tagList,
                        liked: false
                    };
                }
            })
        );
    }
});
router.get("/get_orders", async function (req, res) {
        let orders = await Order.find({active: true}).exec();
        res.json(
            orders.map((order) => {
                return {
                    _id: order._id,
                    user_email: order.user_email,
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
router.get("/get_poster", async function (req, res) {
        let poster = await Poster.findOne({
            _id: req.query.id,
            active: true,
        }).exec();
        res.json(poster);
    }
);
router.get("/get_posters", async function (req, res) {
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
router.get("/get_user", async function (req, res) {
        let user = await User.findOne({
            e_mail: req.query.email,
            active: true,
        }).exec();
         await res.json(user);
    }
);

router.get("/get_user_orders", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    let user = await User.findOne({
        e_mail: req.body.email,
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
router.get("/get_users", async function (req, res) {
        let users = await User.find({active: true}).exec();
        if (users === undefined||users === ""||users===null) {
            debug("no users found");
            users=[];
            await res.json(users);
        }else
            await res.json(
                users.map((user) => {
                    return {
                        e_mail: user.e_mail,
                        fullName: {
                            fName: user.fullName.fName,
                            lName: user.fullName.lName
                        },
                        phone: user.phone,
                        category: user.category
                    };
                }));
    }
);
router.post('/update_poster', async function(req, res,next) {
    let update_poster = {
        _id:req.body._id,
        name: req.body.name,
        creator: req.body.creator,
        img: req.body.img,
        price: req.body.price,
        measurement:{
            width:req.body.measurement.width,
            length:req.body.measurement.length,
        },
        tagList:req.body.tagList,
        amount:req.body.amount,
    };
    try {
        await Poster.UPDATE(update_poster);
        console.log("Poster was updated");
    } catch (err) {  console.log("could not update poster price "+err) }
    setTimeout((function() {res.status(200).send()}), 1000);
});
router.post("/update_poster_cart_amount", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    try {
        let user = await User.findOne({
            e_mail: req.body.email,
            active: true
        }).exec();
        if (user === undefined) {
            debug("error in finding user");
            res.send(404)
        }
        let posterId = req.body.posterId;
        let amount = req.body.amount;
        let poster = await Poster.findOne({
            _id: posterId,
            active: true
        }).exec();

        let cart = user.cartItems;
        if (poster === undefined) {
            res.send(404);
        } else {
            let poster = cart.findIndex((item) => item.posterId === posterId);
            if (
                cart === [] ||
                poster === -1
            ) {
                debug("ERROR no such poster in cart");
                res.send(404);
            }
            else {
                cart[poster].amount = amount;
                user.cartItems = cart;
                await User.UPDATE(user);
                debug("successfully updated in cart");
                res.send(200);
            }
        }
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});
router.post("/update_poster_cart_size", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    try {
        let user = await User.findOne({
            e_mail: req.body.email,
            active: true
        }).exec();
        if (user === undefined) {
            debug("error in finding user");
            res.send(404)
        }
        let posterId = req.body.posterId;
        let width = req.body.measurement.width;
        let length=req.body.measurement.length;

        let poster = await Poster.findOne({
            _id: posterId,
            active: true
        }).exec();

        let cart = user.cartItems;
        if (poster === undefined) {
            res.send(404);
        } else {
            let poster = cart.findIndex((item) => item.posterId === posterId);
            if (
                cart === [] ||
                poster === -1
            ) {
                debug("ERROR no such poster in cart");
                res.send(404);
            }
            else {
                cart[poster].measurement.width = width;
                cart[poster].measurement.length = length;
                user.cartItems = cart;
                await User.UPDATE(user);
                debug("successfully updated in cart");
                res.send(200);
            }
        }
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});
router.post("/update_user", async function (req, res) {
    let user = {
        fullName: {
            fName: req.body.fName,
            lName: req.body.lName
        },
        phone:req.body.phone,
        e_mail: req.body.e_mail,
        category: req.body.category,
        cartItems: req.body.cartItems,
        orderHistory: req.body.orderHistory,
        likedItems: req.body.likedItems
    };

    try {
        await User.UPDATE(user, req.body.password, function (err, user) {
            if (err) {
                debug("update error")
            }
        });
        debug("User was updated");
    } catch (err) {
        debug("User updated error")
    }
    setTimeout((function () {
        res.status(200).send()
    }), 6000);
});
router.post("/cancel_order", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    try {
        let user = await User.findOne({
            e_mail: req.body.email,
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

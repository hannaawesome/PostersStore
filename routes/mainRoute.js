var express = require('express');
var router = express.Router();
const {User} = require("../models/user");
const {Message} = require("../models/message");
const {Order} = require("../models/order");
const {Poster} = require("../models/poster");
const {Chatroom}=require("../models/chatroom");
const passport = require("passport");
const debug = require("debug")("router");
const { catchErrors } = require("../handlers/errorHandlers");
const auth = require("./auth");
var async = require('async');
const nodemailer = require('nodemailer');
const sha256 = require("js-sha256");
var multer = require('multer');

const path = require("path");

passport.use("User",User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
function initPosters(){
    var posters = [
        {
            _id:40000,
            name: "Sky",
            creator:"Lorde",
            img: "../../images/pexels-north-1407322.jpg",
            price: 50,
            sizeList:["50X70","160X180","100X120"],
            tagList:["view"],
            amount:2,
            active:true
        },
        {
            _id:40001,
            name: "Car",
            creator:"Hanna",
            img:"../../images/pexels-pixabay-326259.jpg",
            price: 20,
            sizeList:["50X70","160X180"],
            tagList:["vehicle"],
            amount:4,
            active:true
        },
        {
            _id:40002,
            name: "Guitar",
            creator:"George",
            img: "../images/pexels-eberhard-grossgasteiger-844297.jpg",
            price: 40,
            sizeList:["100X120"],
            tagList:["music"],
            amount:7,
            active:true
        }];
    posters.forEach((element) =>
        Poster.CREATE([
            element._id,
            element.name,
            element.creator,
            element.img,
            element.price,
            element.sizeList,
            element.tagList,
            element.amount,
        ])
    );
}

/*router.get("/get_chatrooms", catchErrors(async function (req, res) {
    const chatrooms = await Chatroom.find({});

    res.json(chatrooms);
}));*/
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
    const messages = await Message.find({chatroom:req.query.chatroom});

    res.json(messages);
}));
router.post("/update_like_to_message" ,catchErrors(async function (req, res) {
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
    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com|@g.jct.ac.il/;

    if (!emailRegex.test(req.body.e_mail)) throw "Email is not supported from your domain.";
    if (req.body.password.length < 6) throw "Password must be at least 6 characters long.";

    console.log("trying to add");
    let usersList = await User.REQUEST();
    let user = {
        _id: usersList.length.toString(),
        fullName: req.body.fullName,
        phone:req.body.phone,
        address:req.body.address,
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
    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com|@g.jct.ac.il/;

    if (!emailRegex.test(req.body.e_mail)) throw "Email is not supported from your domain.";
    if (req.body.password.length < 6) throw "Password must be at least 6 characters long.";

    let usersList = await User.REQUEST();
    let user = {
        _id: usersList.length.toString(),
        fullName: req.body.fullName,
        phone:req.body.phone,
        address:req.body.address,
        e_mail: req.body.e_mail,
        category: usersList.length?'Customer':"Admin",
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
   // initPosters();
    passport.authenticate("User", (err, user, info) => {
        if (err) {
            console.log("ERROR " + err);
            res.send(404);
        } else if (!user) {
            console.log("User is NULL ");
            throw "";
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
router.post("/add_order",  async function (req, res) {
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
            user.address,
            totalPrice
        ]);
        user.orderHistory.push({orderId:orderId});
        User.UPDATE(user);
        debug("order created")
    } catch (err) {
        debug(err);
        res.send(404);
    }});
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'in-posters/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
});

var upload = multer({ storage: storage }).single("file")



router.post("/uploadImage", (req, res) => {

    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: "../.."+res.req.file.path.substr(17), fileName: res.req.file.filename })
    })

});
router.post('/add_poster',async function (req,res){
        try {
    let posters =  await Poster.find({}).exec();
    let posterId = 40000;
    if (posters !== undefined && posters.length) {
        posterId = parseInt(posters[posters.length - 1]._id) + 1;
    }

    //create the order in the DB
     Poster.CREATE([
        posterId,
        req.body.name,
       req.body.creator,
        req.body.img,
        req.body.price,
        req.body.sizeList,
        req.body.tagList,
       req.body.amount
    ]);
            res.send(200);
        } catch (err) {
    console.log(err);
    res.send(404);
}
});

router.post("/add_to_cart", async function (req, res) {
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
        let poster = await Poster.findOne({
            _id: posterId,
            active: true
        }).exec();

        let cart = user.cartItems;
        let liked=user.likedItems;
        if (poster === undefined) {
            res.send(404);
        } else {
            if (cart === undefined) cart = [];
            if(liked.findIndex((item) => item.posterId === posterId) !== -1)
                liked.remove(liked.findIndex((item) => item.posterId === posterId));
            //if (
            //    cart === [] ||
            //   cart.findIndex((item) => item.posterId === posterId) === -1
            //) {
            cart.push({
                posterId: posterId,
                amount:1,
                measurement:  req.body.measurement
            });
            user.cartItems = cart;
            user.likedItems=liked;
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
router.post("/update_liked",  async function (req, res) {
    try {
        let user = await User.findOne({
            e_mail: req.body.email,
            active: true
        }).exec();
        if(user===undefined) {
            console.log("error in finding user");
            res.send(404)
        }
        let posterId = req.body.posterId;
        let isLiked=req.body.state;
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
                debug("successfully updated like");
                res.send(200);
            }
        }
    } catch (err) {
        console.log(err);
        res.send(404);
    }
});

router.post("/delete_from_cart", async function (req, res) {
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

router.get("/get_liked_items", async function (req, res) {
    let user = await User.findOne({
        e_mail: req.query.email,
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
                        price: p.price,
                        sizeList:p.sizeList,
                        tagList: p.tagList,
                    };
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
                    shipmentAddress: order.shipmentAddress,
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
                posters.map((p) => {
                    return {
                        _id: p._id,
                        name: p.name,
                        creator: p.creator,
                        img: p.img,
                        price: p.price,
                        sizeList:p.sizeList,
                        tagList: p.tagList,
                        amount:p.amount
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

router.get("/get_user_orders", async function (req, res) {
    let user = await User.findOne({
        e_mail: req.query.email,
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
                            shipmentAddress: order.shipmentAddress,

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
                        fullName:user.fullName,
                        phone: user.phone,
                        address:user.address,
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
        sizeList:req.body.sizeList,
        tagList:req.body.tagList,
        amount:req.body.amount,
    };
    try {
        await Poster.UPDATE(update_poster);
        console.log("Poster was updated");
    } catch (err) {  console.log("could not update poster price "+err) }
    setTimeout((function() {res.status(200).send()}), 1000);
});
router.post("/update_poster_cart_amount",  async function (req, res) {
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
                cart[poster].amountChosen = amount;
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
router.post("/update_poster_cart_size",  async function (req, res) {
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
                cart[poster].measurementChosen=req.body.measurement;
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
        fullName:  req.body.fullName,
        phone:req.body.phone,
        address:req.body.address,
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
router.post("/cancel_order",  async function (req, res) {
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
router.post('/delete_user',async function(req, res,next) {
    try {
        await User.DELETE(req.query.email);
    }
    catch(err){
        console.log("could not delete");
    }
    setTimeout((function() {res.status(200).send()}), 1000);
});
router.post('/delete_poster',async function(req, res,next) {
    try {
        await Poster.DELETE(req.query.id);
    }
    catch(err){
        console.log("could not delete poster "+err);
    }
    setTimeout((function() {res.status(200).send()}), 1000);
});
// router.post('/forgot_password', async function(req, res, next) {
//     await async.waterfall([
//         function (done) {
//             crypto.randomBytes(20, function (err, buf) {
//                 var token = buf.toString('hex');
//                 done(err, token);
//             });
//         },
//         async function (token, done) {
//             try {
//                 let us = await User.findOne({e_mail: req.body.email}).exec();
//                 if (!us) {
//                     res.status(404).send();
//                     return;
//                 }
//                 us.resetPasswordToken = token;
//                 us.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//
//                 await us.save();
//                 var smtpTransport = nodemailer.createTransport({
//                     service: 'gmail',
//                     auth: {
//                         user: 'hweissbe@g.jct.ac.il',
//                         pass: 'Hannaw18'
//                     }
//                 });
//                 var mailOptions = {
//                     to: us.mailAddress,
//                     from: 'hweissbe@g.jct.ac.il',
//                     subject: 'Password Reset',
//                     text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//                         'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//                         'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//                         'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//                 };
//                 smtpTransport.sendMail(mailOptions, function (err) {
//                     res.status(200).send();
//                 });
//             } catch (err) {
//                 console.log(`Failure ${err}`);
//             }
//         }], function (err) {
//         if (err) return next(err);
//     });
// });
// router.get('/reset_password', async function(req, res, next) {
//     try {
//         let us = await  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }).exec();
//         if (!us) {
//             res.status(404).send();
//             return;
//         }
//         console.log(us);
//     } catch (err) {
//         console.log(`Failure ${err}`);
//     }
// });
router.post('/update_password', async function(req, res, next) {
    try {
        let us = await User.findOne({ e_mail:req.body.e_mail }).exec();
        if (!us) {
            res.status(404).send();
            return;
        }
        await us.setPassword(req.body.password);
        await us.save();
        res.status(200).send();
    } catch (err) {
        console.log(`Failure ${err}`);
    }
});

















const SESSION_COOKIE_SECRET = '';
const SESSOIN_COOKIE_MAX_AGE_IN_MS = 60 * 60 * 1000;
const SESSION_COOKIE_IS_SECURE = false;

const GOOGLE_CLIENT_ID = '';
const GOOGLE_CLIENT_SECRET = '';
const SENDGRID_API_KEY = '';

//const transport = createTransport(nodemailerSendgrid({
 //   apiKey: SENDGRID_API_KEY,
//}));

// const users = [{
//     id: 'local/a0234aDdfj-2f4sdfa3oEerq-2U4',
//     fullName: 'A Ayevich',
//     email: 'hello@example.com',
//     password: 'password'
// }];

// pass.serializeUser((user, cb) => cb(null, user));
// pass.deserializeUser((u, cb) => cb(null, u));

// pass.use(new LocalStrategy({
//     usernameField: 'email',
// }, (email, password, cb) => {
//     const user = users.find(u => u.email === email);
//     cb(null, (user && user.password === password) ? user : false);
// }));

// pass.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: `http://localhost:${PORT}/auth/google/callback`
// }, (accessToken, refreshToken, profile, cb) => {
//     const user = {
//         id: `google/${profile.id}`,
//         email: profile.email,
//         fullName: profile.displayName,
//         profile,
//         tokens: { accessToken, refreshToken },
//     };
//     users.push(user);
//     cb(null, user);
// }));

//const app = asyncify(express());
//const FileStore = createFileStore(session);

//router.disable('x-powered-by');
//router.use(flash());

// app.get('/forgot', (req, res, next) => {
//     res.setHeader('Content-type', 'text/html');
//     res.end(templates.layout(`
//     ${templates.error(req.flash())}
//     ${templates.forgotPassword()}
//   `));
// });

router.post('/forgot_password', async (req, res, next) => {
   try{  const user =await User.FIND_ONE_USER(req.body.email);
    if (!user) {
        console.log( 'No account with that email address exists.');
        //req.flash('error', 'No account with that email address exists.');
        //return res.redirect('/forgot');
    }
       const code=Math.floor(Math.random() * 999999);

       //const token = (await util.promisify(crypto.randomBytes)(6));
       const token = sha256(code + process.env.SALT_CODE);

     //const token = (await util.promisify(crypto.randomBytes)(6)).toString('hex');
   // console.log(token2);
       var smtpTransport = nodemailer.createTransport({
           service: 'gmail',
           auth: {
               user: 'hweissbe@g.jct.ac.il',
               pass: 'Hannaw18'
           }
       });
    user.resetPasswordToken = token;
    user.save();
    //User.UPDATE(user,"");
    //user.resetPasswordExpires = Date.now() + 3600000;
    const resetEmail = {
        to: req.body.email,
        from: 'noreply@gmail.com',
        subject: 'inPosters Password Reset',
        text:"Your confirmation code is "+ code
    //     text: `
    //   You are receiving this because you (or someone else) have requested the reset of the password for your account.
    //   Please click on the following link, or paste this into your browser to complete the process:
    //   http://${req.headers.host}/reset/${token}
    //   If you did not request this, please ignore this email and your password will remain unchanged.
    // `,
    };

    await smtpTransport.sendMail(resetEmail);}
    catch (e) {
        console.log(e);
    }
  //  req.flash('info', `An e-mail has been sent to ${user.e_mail} with further instructions.`);
//throw `An e-mail has been sent to ${user.e_mail} with further instructions.`;
    //res.redirect('/forgot');
});

router.post('confirm_code', (req, res) => {
   try {
       const hash=sha256(req.data.code + process.env.SALT_CODE);
       const user = User.find(u => (
           //   (u.resetPasswordExpires > Date.now()) &&
           //   crypto.timingSafeEqual(Buffer.from(u.resetPasswordToken), Buffer.from(req.params.token))
       u.e_mail === req.data.email &&  sha256(u.code + process.env.SALT_CODE) === hash
       ));

       if (!user) {
           throw('Code is incorrect.');
       }
       user.setPassword(req.body.password);
       delete user.resetPasswordToken;
       User.save();
   }catch(e){
       console.log(e);
   }

});

// router.post('/reset/:token', async (req, res) => {
//     const user = User.find(u => (
//         (u.resetPasswordExpires > Date.now()) &&
//         crypto.timingSafeEqual(Buffer.from(u.resetPasswordToken), Buffer.from(req.params.token))
//     ));
//
//     if (!user) {
//         req.flash('error', 'Password reset token is invalid or has expired.');
//     }
//
//     user.setPassword(req.body.password);
//     delete user.resetPasswordToken;
//     delete user.resetPasswordExpires;
//     user.save();
//     const resetEmail = {
//         to: user.e_mail,
//         from: 'passwordreset@example.com',
//         subject: 'Your password has been changed',
//         text: `
//       This is a confirmation that the password for your account "${user.e_mail}" has just been changed.
//     `,
//     };
//
//     await transport.sendMail(resetEmail);
//     req.flash('success', `Success! Your password has been changed.`);
//
// });

module.exports = router;

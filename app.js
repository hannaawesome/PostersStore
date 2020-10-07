let path = require('path');
var express = require('express');
let session = require('express-session');
let debug = require('debug')('TheProject:app');
var logger = require('morgan');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
let connectMongo = require('connect-mongo');
let mongoose = require('mongoose');
const passport = require("passport");
let app = express();
//const publicPath = path.join(__dirname, "..", "in-posters", "public");

// const Branch = require('./models')("Branch");
// const Poster = require('./models')("Poster");
// const Order = require('./models')("Order");
// const Message = require('./models')("Message");
//require('./models');

let addMessageRoute= require('./routes/addMessage');
let indexRoute = require('./routes/index');
let addOrderRoute = require('./routes/addOrder');
let addToCartRoute = require('./routes/addToCart');
let addToLikedRoute = require('./routes/addToLiked');
let deleteFromCartRoute = require('./routes/deleteFromCart');
let getLikedItemsRoute = require('./routes/getLikedItems');
let getUserOrdersRoute = require('./routes/getUserOrders');
let logoutRoute = require('./routes/logout');
let cancelOrderRoute = require('./routes/cancelOrder');
let loginRoute = require('./routes/login');
let registerRoute = require('./routes/register');
let updateUserDetailRoute = require('./routes/updateUserDetails');
let updatePosterCartAmountRoute = require('./routes/updatePosterCartAmount');
let updateUserRoute = require('./routes/updateUser');
let getUserRoute = require('./routes/getUser');
let updatePosterCartSizeRoute = require('./routes/updatePosterCartSize');
let getPosterRoute = require('./routes/getPoster');
let addUserRoute = require('./routes/addUser');
let addPosterRoute = require('./routes/addPoster');
let getUserIdByEmailRoute = require('./routes/getUserIdByEmail');
let updatePosterRoute = require('./routes/updatePoster');
let getOrdersRoute = require('./routes/getOrders');
let getUsersRoute = require('./routes/getUsers');
let getPostersRoute = require('./routes/getPosters');


//app.use(express.static(publicPath));
app.use(express.static('in-posters/build'));
//app.use(express.static(path.join(__dirname, 'public')));
let MongoStore = connectMongo(session);
let secret = "MyProject session secret";
app.use(cookieParser(secret));
 let sessConnStr = `mongodb+srv://Hanna:Hannaw18@cluster0.nxjsf.azure.mongodb.net/inP`;
 let sessionConnect = mongoose.createConnection();
 (async () => {

    try {
        await sessionConnect.openUri(sessConnStr, {useNewUrlParser: true, useUnifiedTopology: true});
    } catch (err) {
        debug(`Error connecting to session backend DB: ${err}`);
        process.exit(0);
    }

    process.on('SIGINT', async () => {
        await sessionConnect.close();
        process.exit(0);
    });

app.use(session({
    name: 'users.sid',         // the name of session ID cookie
    secret: secret,            // the secret for signing the session ID cookie - mandatory option
    resave: false,             // do we need to resave unchanged session? (only if touch does not work)  - mandatory option
    saveUninitialized: false,  // do we need to save an 'empty' session object? - mandatory option
    rolling: true,             // do we send the session ID cookie with each response?
    store: new MongoStore({mongooseConnection: sessionConnect}), // session storage backend
    cookie: {maxAge: 900000, httpOnly: true, sameSite: true}  // cookie parameters
    // NB: maxAge is used for session object expiry setting in the storage backend as well
}));
})()
    .catch(err => {
        debug(`Failure: ${err}`);
        process.exit(0);
    });

//view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
    //app.use(favicon(path.join(__dirname, '/public/images/ariel.jpg')));
    // Configure passport middleware
    app.use(passport.initialize());
    app.use(passport.session());





   // app.use('/', indexRoute);
	app.use('/add_order', addOrderRoute);
	app.use('/add_to_cart', addToCartRoute);
	app.use('/add_to_liked', addToLikedRoute);
	app.use('/delete_from_cart', deleteFromCartRoute);
	app.use('/get_liked_items', getLikedItemsRoute);
	app.use('/get_user_orders', getUserOrdersRoute);
	app.use('/logout', logoutRoute);
	app.use('/cancel_order', cancelOrderRoute);
	app.use('/login', loginRoute);
	app.use('/register', registerRoute);
    app.use('/update_user_detail', updateUserDetailRoute);
    app.use('/update_product_cart_amount', updatePosterCartAmountRoute);
    app.use('/update_product_cart_size', updatePosterCartSizeRoute);
    app.use('/update_user', updateUserRoute);
    app.use('/update_poster', updatePosterRoute);
    app.use('/get_user', getUserRoute);
    app.use('/get_poster', getPosterRoute);
    app.use('/add_user', addUserRoute);
    app.use('/add_poster', addPosterRoute);
    app.use('/get_user_id_by_email', getUserIdByEmailRoute);
    app.use('/get_users', getUsersRoute);
    app.use('/get_orders', getOrdersRoute);
app.use('/get_posters', getPostersRoute);

// app.all('/*', async (req, res, next) => {
//     debug('headers');
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
//     next();
// });
// let sess;
// app.all('/*', async (req, res, next) => {
//     sess = req.session;
//     debug(sess);
//     next();
// });


module.exports = app;


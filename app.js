let path = require('path');
let express = require('express');
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

///const publicPath = path.join(__dirname, "..", "in-posters", "public");


(async () => {


    let MongoStore = connectMongo(session);
    let sessConnStr = "mongodb://localhost/TheProject";
    let sessionConnect = mongoose.createConnection();
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
//view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //app.engine('html', require('ejs').renderFile);
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    let secret = "MyProject session secret";
    app.use(cookieParser(secret));

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
    app.use(favicon(path.join(__dirname, '/public/images/ariel.jpg')));
    app.use(express.static(path.join(__dirname, 'public')));
    // Configure passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    var users = [];
    var branches = [];
    var posters = [];
    var massages = [];
    var orders = [];

    const User = require('./models')("User");
    const Branch = require('./models')("Branch");
    const Poster = require('./models')("Poster");
    const Order = require('./models')("Order");
    const Message = require('./models')("Message");

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


    app.use('/', indexRoute);
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


    app.use(function (req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    app.use(function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.render('error');
    });
})()
    .catch(err => {
        debug(`Failure: ${err}`);
        process.exit(0);
    });
// app.get("*", (req, res) => {
//     res.sendFile(path.join(publicPath, "index.html"));
// });

module.exports = app;


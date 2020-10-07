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


let mainRoute = require('./routes/mainRoute');


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

   app.use( mainRoute);


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


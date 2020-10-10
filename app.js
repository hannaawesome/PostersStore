var bodyParser = require("body-parser");
const passport = require("passport");
var favicon = require("serve-favicon");
const secret="thiserycischhbaesrfinaldfftproject";
const expressSession = require("express-session")({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 900000, httpOnly: true, sameSite: true}
});
const routes = require('./routes');
//var basicRouter = require("./routes/mainRoute");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
//var router = express.Router();

const publicPath = path.join(__dirname, "..", "in-posters", "public");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.static(publicPath));
app.use(express.static('in-posters/build'));

// view engine setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
//app.use(favicon(__dirname + "/public/favicon.png"));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join(__dirname, "in-posters", "build")));

 // app.use(
 //     "/account",
 //     express.static(path.join(__dirname, "in-posters", "build"))
 // );
// app.use(
//     "/store",
//     express.static(path.join(__dirname, "in-posters", "build"))
// );
// app.use(
//     "/register",
//     express.static(path.join(__dirname, "in-posters", "build"))
// );
// app.use(
//     "/log_in",
//     express.static(path.join(__dirname, "in-posters", "build"))
// );
// app.use(
//     "/cart",
//     express.static(path.join(__dirname, "in-posters", "build"))
// );
// app.use(
//     "/liked",
//     express.static(path.join(__dirname, "in-posters", "build"))
// );
// app.use(
//     "/contact",
//     express.static(path.join(__dirname, "in-posters", "build"))
// );

// function redirectPosterEdit(e) {
//     history.push("/poster_edit");
// }
//
// function redirectUsers(e) {
//     history.push("/users");
// }
//
// function redirectUserEdit(e) {
//     history.push("/user_edit");
// }
//
// function redirectOrderList(e) {
//     history.push("/order_list");
// }
//
// function redirectStock(e) {
//     history.push("/stock");
// }
//
// function redirectCheckout(e) {
//     history.push("/checkout");
// }

//app.use("/", basicRouter);
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});



module.exports = app;



// let path = require('path');
// var express = require('express');
// let session = require('express-session');
// let debug = require('debug')('TheProject:app');
// var logger = require('morgan');
// var createError = require('http-errors');
// var cookieParser = require('cookie-parser');
// var favicon = require('serve-favicon');
// let connectMongo = require('connect-mongo');
// let mongoose = require('mongoose');
// const passport = require("passport");
// let app = express();
// //const publicPath = path.join(__dirname, "..", "in-posters", "public");
//
// let mainRoute = require('./routes/mainRoute');
//
//
// //app.use(express.static(publicPath));
// app.use(express.static('in-posters/build'));
// //app.use(express.static(path.join(__dirname, 'public')));
// let MongoStore = connectMongo(session);
// let secret = "MyProject session secret";
// app.use(cookieParser(secret));
//  let sessConnStr = `mongodb+srv://Hanna:Hannaw18@cluster0.nxjsf.azure.mongodb.net/inP`;
//  let sessionConnect = mongoose.createConnection();
//  (async () => {
//
//     try {
//         await sessionConnect.openUri(sessConnStr, {useNewUrlParser: true, useUnifiedTopology: true});
//     } catch (err) {
//         debug(`Error connecting to session backend DB: ${err}`);
//         process.exit(0);
//     }
//
//     process.on('SIGINT', async () => {
//         await sessionConnect.close();
//         process.exit(0);
//     });
//
// app.use(session({
//     name: 'users.sid',         // the name of session ID cookie
//     secret: secret,            // the secret for signing the session ID cookie - mandatory option
//     resave: false,             // do we need to resave unchanged session? (only if touch does not work)  - mandatory option
//     saveUninitialized: false,  // do we need to save an 'empty' session object? - mandatory option
//     rolling: true,             // do we send the session ID cookie with each response?
//     store: new MongoStore({mongooseConnection: sessionConnect}), // session storage backend
//     cookie: {maxAge: 900000, httpOnly: true, sameSite: true}  // cookie parameters
//     // NB: maxAge is used for session object expiry setting in the storage backend as well
// }));
// })()
//     .catch(err => {
//         debug(`Failure: ${err}`);
//         process.exit(0);
//     });
//
// //view engine setup
//     app.set('views', path.join(__dirname, 'views'));
//     app.set('view engine', 'ejs');
//
//     app.use(logger('dev'));
//     app.use(express.urlencoded({ extended: true }));
//     app.use(express.json());
//     //app.use(favicon(path.join(__dirname, '/public/images/ariel.jpg')));
//     // Configure passport middleware
//     app.use(passport.initialize());
//     app.use(passport.session());
//
//    app.use( mainRoute);
//
//
// // app.all('/*', async (req, res, next) => {
// //     debug('headers');
// //     res.header('Access-Control-Allow-Origin', '*');
// //     res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
// //     next();
// // });
// // let sess;
// // app.all('/*', async (req, res, next) => {
// //     sess = req.session;
// //     debug(sess);
// //     next();
// // });
//
//
// module.exports = app;
//

let path = require('path');
let express = require('express');
let session=require('express-session');
let debug=require('debug')('TheProject:app');
var logger = require('morgan');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
//const passport = require('passport');
let connectMongo = require('connect-mongo');
let mongoose = require('mongoose');
const LocalStrategy = require('passport-google-oauth');

let app = express();



(async ()=> {


	let MongoStore = connectMongo(session);
	let sessConnStr = "mongodb://localhost/TheProject";
	let sessionConnect = mongoose.createConnection();
	try {
		await sessionConnect.openUri(sessConnStr,{useNewUrlParser: true, useUnifiedTopology: true});
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
	app.use(express.urlencoded({ extended: false }));

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
//	app.use(passport.initialize());
//	app.use(passport.session());

	var users = [];
	var branches = [];
	var posters = [];
	var massages=[];
	var carts=[];
	var itemsInCart=[];

	const User = require('./models')("User");
	const Branch = require('./models')("Branch");
	const Poster = require('./models')("Poster");
	const Cart = require('./models')("Cart");
	const Message = require('./models')("Message");
	const ItemInCart = require('./models')("ItemInCart");

	let indexRoute = require('./routes/index');
	let confirmLoginRoute = require('./routes/confirmLogin');
	let loginRoute = require('./routes/login');
	let aboutRoute = require('./routes/about');
	let activeBNumbersRoute = require('./routes/activeBNumbers');
	let addBranchRoute = require('./routes/addBranch');
	let addUserRoute = require('./routes/addUser');
	let allBNumbersRoute = require('./routes/allBNumbers');
	let branchesRoute = require('./routes/branches');
	let catalogRoute = require('./routes/catalog');
	let changeStatusUserRoute = require('./routes/changeStatusUser');
	let contactRoute = require('./routes/contact');
	let deleteUserRoute = require('./routes/deleteUser');
	let navRoute = require('./routes/nav');
	let updateUserRoute = require('./routes/updateUser');
	let usersRoute = require('./routes/users');
	let addPosterRoute = require('./routes/addPoster');
	let updatePosterRoute = require('./routes/updatePoster');
	let deletePosterRoute = require('./routes/deletePoster');
	let updateBranchRoute = require('./routes/updateBranch');
	let deleteBranchRoute = require('./routes/deleteBranch');
	let workerCatalogRoute = require('./routes/worker_catalog');
	let storeRoute = require('./routes/store');
	let resetPasswordRoute = require('./routes/resetPassword');
	let forgotPasswordRoute = require('./routes/forgotPassword');
	let emptyCartRoute = require('./routes/emptyCart');
	let chatRoute = require('./routes/chat');
	let addToCartRoute = require('./routes/addToCart');
	let logoutRoute = require('./routes/logout');
	let deleteItemInCartRoute=require('./routes/deleteItemInCart');

	app.use('/', indexRoute);
	app.use('/confirm_login', confirmLoginRoute);
	app.use('/login', loginRoute);
	app.use('/about', aboutRoute);
	app.use('/nav', navRoute);
	app.use('/all_bnumbers', allBNumbersRoute);
	app.use('/active_bnumbers', activeBNumbersRoute);
	app.use('/users', usersRoute);
	app.use('/branches', branchesRoute);
	app.use('/contact', contactRoute);
	app.use('/catalog', catalogRoute);
	app.use('/change_status_user', changeStatusUserRoute);
	app.use('/update_user', updateUserRoute);
	app.use('/add_user', addUserRoute);
	app.use('/add_branch', addBranchRoute);
	app.use('/delete_user', deleteUserRoute);
	app.use('/add_poster', addPosterRoute);
	app.use('/update_poster', updatePosterRoute);
	app.use('/delete_poster', deletePosterRoute);
	app.use('/update_branch', updateBranchRoute);
	app.use('/delete_branch', deleteBranchRoute);
	app.use('/worker_catalog', workerCatalogRoute);
	app.use('/store', storeRoute);
	app.use('/reset_password', resetPasswordRoute);
	app.use('/empty_cart', emptyCartRoute);
	app.use('/forgot_password', forgotPasswordRoute);
	app.use('/chat', chatRoute);
	app.use('/add_to_cart', addToCartRoute);
	app.use('/logout', logoutRoute);
	app.use('/delete_item_in_cart', deleteItemInCartRoute);



	//passport.use(User.createStrategy());
	//passport.serializeUser(User.serializeUser());
	//passport.deserializeUser(User.deserializeUser());

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
	.catch(err=>{debug(`Failure: ${err}`); process.exit(0); });
module.exports = app;


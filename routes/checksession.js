module.exports = (req, res, next) => {
    if (req.session === undefined || req.session._id === undefined) {
        res.get('functionality.js');
        res.redirect('/login');
    }
    else {
        res.get('functionality.js');
        next();
    }
};
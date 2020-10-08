const router = require('express').Router();
const mainRoute = require('./mainRoute');
const path = require('path');

// API routes
router.use("/", mainRoute);
// If no API routes are hit, send the React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../in-posters/build/index.html'));
});

module.exports = router;
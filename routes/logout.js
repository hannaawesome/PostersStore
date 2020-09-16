var express = require('express');
var router = express.Router();

/* POST logout. */
router.post('/', async (req,res) => {
    debug('logging out');
    req.session.destroy(err => {
        debug('logged out');
        res.redirect('/');

        if(err) {
            console.log(err);
        }
    });
});

module.exports = router;
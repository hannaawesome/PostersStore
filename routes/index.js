var express = require('express');
var router = express.Router();
const checksession = require('./checksession');

const debug = require('debug')('TheProject:index');
/* GET home page. */

router.get('/', checksession,async (req, res)=> {
    debug('requested');
        req.session.count++;
    res.render('index', {
        count: req.session.count,username: req.session.username });

});
// router.get('/logout', async (req, res) => {
//     debug('logging out');
//     req.session.regenerate(err => {
//         debug('logged out');
//         res.redirect('/');
//     });
// });

module.exports = router;

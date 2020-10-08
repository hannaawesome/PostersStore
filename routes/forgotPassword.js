var express = require('express');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var router = express.Router();
const User = require("../models/user");
router.post('/', async function(req, res, next) {
    await async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        async function (token, done) {
            try {
                let us = await User.findOne({e_mail: req.body.email}).exec();
                if (!us) {
                    res.status(404).send();
                    return;
                }
                us.resetPasswordToken = token;
                us.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                await us.save();
                var smtpTransport = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'hweissbe@g.jct.ac.il',
                        pass: 'Hannaw18'
                    }
                });
                var mailOptions = {
                    to: us.mailAddress,
                    from: 'hweissbe@g.jct.ac.il',
                    subject: 'Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    res.status(200).send();
                });
            } catch (err) {
                console.log(`Failure ${err}`);
            }
        }], function (err) {
        if (err) return next(err);
    });
});



module.exports = router;
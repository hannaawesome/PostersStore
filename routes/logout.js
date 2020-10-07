const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");
//???????????????????????
router.get("/", connectEnsureLogin.ensureLoggedIn(), async function (req, res) {
    req.logout();
});
module.exports = router;


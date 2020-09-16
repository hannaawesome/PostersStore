var crypto = require('crypto');

var dec = function(lallaveprivada, elchoricillo) {
	var elbufferadescifrar = new Buffer(elchoricillo, "base64");
	return crypto.privateDecrypt({"key" : lallaveprivada, padding : crypto.constants.RSA_PKCS1_PADDING}, elbufferadescifrar).toString("utf8");
}

module.exports.dec = dec;



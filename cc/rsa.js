require("./lib/Barrett");
require("./lib/BigInt");
require("./lib/RSA");

setMaxDigits(19);
var hackerKey = new RSAKeyPair(
 "5dd5ad3ab3e3eb5409c0ead832b7a21d",
 "5dd5ad3ab3e3eb5409c0ead832b7a21d",
 "907e4e9bdca8832febfa32d958dee42d"
);

var data = '';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
    data += chunk;
});

process.stdin.on('end', function() {
    console.log(encryptedString(hackerKey, data));
});

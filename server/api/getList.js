var express = require('express');
var router = express.Router();
var request = require('request');

var parser = require('xml2json');
var Transform = require('stream').Transform;

router.get('/', function(req, res, next) {
  login(res)
  var unirest = require("unirest");

var req1 = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary");

req1.query({
	"region": "US",
	"symbol": "AMRN"
});

req1.headers({
	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
	"x-rapidapi-key": "6e44b3d85fmsh6c8d807325d1e4bp156873jsn6f0d7bbd9726"
});


req1.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});
});

module.exports = router;

// var http = require('http');
// var fs = require('fs');
// var parser = require('xml2json');
// var Transform = require('stream').Transform;
function login(res){
  request('http://apidintegra.tkfweb.com:80/apid/request?method=login&ci=apiD&ui=SG21701-f10apid13&pwd=f10apid_13',{},(err,response,body)=>{
    console.log(response.body)
    a = f10XML(response.body)// this is the id token, 
    res.json(a)
  })
}
function f10XML(rawXML){
  console.log(JSON.parse(parser.toJson(rawXML)))
  return JSON.parse(parser.toJson(rawXML)).XRF.A.v
}

// var server = http.createServer(function (req, res) {
//   var stream = fs.createReadStream(__dirname + '/data.xml');
//   stream.pipe(xmlParser()).pipe(res);
// });
// server.listen(8000);
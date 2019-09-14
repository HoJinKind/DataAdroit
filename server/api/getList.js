var express = require('express');
var router = express.Router();
var request = require('request');

var parser = require('xml2json');
var Transform = require('stream').Transform;

router.get('/', function(req, res, next) {
  login(res)
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
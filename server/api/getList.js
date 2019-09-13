var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  request('http://apidintegra.tkfweb.com:80/apid/request?method=login&ci=apiD&ui=SG21701-f10apid13&pwd=f10apid_13'
  ).pipe(res);
  console.log(res);
});

module.exports = router;
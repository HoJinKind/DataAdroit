var express = require('express');
var router = express.Router();
var request = require('request');

var parser = require('xml2json');
var Transform = require('stream').Transform;

router.post('/', function(req, res) {
  console.log(req.body.name);
  var unirest = require("unirest");
var req1 = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary");
req1.query({
	"region": "US",
	"symbol": "GOOG"
});


req1.headers({
	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
	"x-rapidapi-key": "6e44b3d85fmsh6c8d807325d1e4bp156873jsn6f0d7bbd9726"
});


req1.end(function (response) {
	if (response.error) throw new Error(response.error);
    var dict = {};
    dict.ebidta = response.body.financialData.ebitda.fmt; 
    dict.revenueGrowth = response.body.financialData.revenueGrowth.fmt; 
    dict.marketCap = response.body.summaryDetail.marketCap.fmt;
    dict.totalRevenue = response.body.financialData.totalRevenue.fmt; 
    dict.totalDebt = response.body.financialData.totalDebt.fmt; 
    dict.profitMargins = response.body.defaultKeyStatistics.profitMargins.fmt;
    dict.sharesOutstanding = response.body.defaultKeyStatistics.sharesOutstanding.fmt;
    dict.enterpriseValue = response.body.defaultKeyStatistics.enterpriseValue.fmt;
    dict.forwardPE = response.body.defaultKeyStatistics.forwardPE.fmt;
    dict.industry = response.body.summaryProfile.industry.industry;
    dict.currency = response.body.earnings.financialCurrency;
    //dict.financialCurrency = response.body.defaultKeyStatistics.financialCurrency
    res.json(response.body);
});
});

module.exports = router;


function collateListOfRelevant(){

}
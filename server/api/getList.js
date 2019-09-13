var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  request({
    uri: 'http://www.giantbomb.com/api/search',
    qs: {
      api_key: '8101bc61497bd0f542a08dc149368e49c4deee9b',
      query: 'World of Warcraft: Legion'
    }
  }).pipe(res);
  console.log(JSON.stringify(res));
  console.log(Object.keys(res));
  console.log(res['domain']);
});

module.exports = router;
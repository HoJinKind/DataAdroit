var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  request.post('http://www.giantbomb.com/api/search',
 { form: {
    api_key: '8101bc61497bd0f542a08dc149368e49c4deee9b',
    query: 'World of Warcraft: Legion'
  }
},(err,res,body)=>{
  console.log(res)
})
  
});

module.exports = router;
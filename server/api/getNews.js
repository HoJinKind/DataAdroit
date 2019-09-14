var express = require('express');
var router = express.Router();
var request = require('request');

var parser = require('xml2json');

router.get('/:topic', function(req,res,next) {
    console.log(new Date())
    request('http://apidintegra.tkfweb.com:80/apid/request?method=login&ci=apiD&ui=SG21701-f10apid13&pwd=f10apid_13',{},(err,res1,body)=>{   
        var id = JSON.parse(parser.toJson(res1.body)).XRF.A.v;
        request(`http://apidintegra.tkfweb.com:80/apid/request?method=getNewsData&search=${req.params.topic}&date_from=08.07.2019& date_to=08.07.2019ci=apiD&ui=SG21701-f10apid13&id=${id}`,{},(err,res2,body)=>{
            var news = JSON.parse(parser.toJson(res2.body)).XRF.NL.N.map((d)=>{return{"id":d.k,"title":d.H}})
            if (news != null) {
                var result = []
                new Promise(function(resolve, reject) {
                    news.forEach((d,i)=>{
                        request(`http://apidintegra.tkfweb.com:80/apid/request?method=getnewsstory&Story=${d.id}&ci=apiD&ui=SG21701-f10apid13&id=${id}`,{},(err,res3,body)=>{   
                        result.push(JSON.parse(parser.toJson(res3.body)).XRF.NL.N.T)
                        if (i == news.length-1) {
                            resolve()
                        }
                        })
                    })
                    // while(news.length != result.length) {}
                    // resolve()
                }).then(()=>{
                    res.json(result)
                });
            } else {
                console.log(news)
                res.json([])
            }
            
            
            
        })
    })
})

module.exports = router; 
// Imports
const express = require("express");
const router = express.Router();
const Nightmare = require("nightmare");
const JSSoup = require("jssoup").default;
const Sentiment = require("sentiment");

// Package Definitions
const nightmareWebsiteFinder = Nightmare();

//able to find top x number of links in search engine. plan is to scrap it
// TODO pass in the string to scrape.
var array1 = ["#r1-1 a.result__a", "#r1-2 a.result__a", "#r1-5 a.result__a"];
//function to scrape a url, able to work to get all p, w/o scrolling
function scrapingArticle(articleURL, nightmareObject) {
  return new Promise(function(resolve, reject) {
    try {
      var ls;
      nightmareObject
        .goto(articleURL)
        .wait(2000)
        .evaluate(function() {
          //here is where I want to return the html body
          return document.body.innerHTML;
        })
        .then(function(body) {
          //loading html body to cheerio
          //var bodyonly = cheerio.bodyonly(body);
          //console.log(bodyonly);

          //filter by p will be using jssoup too
          var soup = new JSSoup(body);
          ls = soup.findAll("p");
          console.log(ls.length + "this is length of an article");

          var returnList = [];
          for (var i = 0; i < ls.length; i++) {
            returnList.push(ls[i].text);
          }
          resolve(returnList);
        });
    } catch (error) {
      reject([]);
    }
  }).catch(reject([]));
}

async function scrapeArticleCallback(articleURL, callback) {
  await scrapingArticle(articleURL, new Nightmare({ show: false }))
    .then(function(random_data) {
      callback(random_data);
    })
    .catch(function(e) {
      //handle error here
    });
}

async function stepOneScrapingWorkPromise(retVal) {
  return new Promise(function(resolve, reject) {
    try {
      //testing how to read html
      //result is the return value
      //by setting function to be not async, we hv to wait for it to finish
      var fullList = [];
      nightmareWebsiteFinder
        .goto("https://duckduckgo.com")
        .type("#search_form_input_homepage", retVal)
        .click("#search_button_homepage")
        .wait("#r1-0 a.result__a")
        .evaluate(function() {
          console.log(`b, in run func`);
          return document.querySelector("#r1-1 a.result__a").href;
        })
        .then(async function(title) {
          console.log(title);

          if (!title.endsWith(`.pdf`)) {
            await scrapeArticleCallback(title, function(result) {
              fullList = fullList.concat(result);
            });
          }
          nightmareWebsiteFinder
            .evaluate(function() {
              return document.querySelector("#r1-2 a.result__a").href;
            })
            .then(async function(title) {
              console.log(title);
              if (!title.endsWith(`.pdf`)) {
                await scrapeArticleCallback(title, function(result) {
                  fullList = fullList.concat(result);
                  console.log(fullList.length);
                });
              }

              nightmareWebsiteFinder
                .evaluate(function() {
                  return document.querySelector("#r1-3 a.result__a").href;
                })
                .then(function(title) {
                  console.log(title);

                  if (!title.endsWith(`.pdf`)) {
                    scrapeArticleCallback(title, function(result) {
                      //appends to array
                      fullList = fullList.concat(result);
                      resolve(fullList);
                    });
                  } else {
                    reject([]);
                  }
                });
            });
        });
    } catch (error) {
      reject([]);
    }
  }).catch();
}

async function run(retVal, res) {
  console.log(`a, in run func`);

  let result = await stepOneScrapingWorkPromise(retVal);
  console.log("it has returned");

  var sentiment = new Sentiment();
  var sentimentResult = sentiment.analyze(result.join());
  res.send(sentimentResult);
}

router.post("/", (req, res) => {
  console.log(req.body.name);
  run(req.body.name, res);
});
module.exports = router;

// .. do more stuff
// const second = await nightmare
//   .evaluate(() => document.querySelector("#r1-2 a.result__a").href)
//   .end()
//   .then(function(title) {
//     console.log(title);
//   });

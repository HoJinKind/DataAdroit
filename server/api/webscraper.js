// Imports
const express = require("express");
const router = express.Router();
const Nightmare = require("nightmare");
const JSSoup = require("jssoup").default;
const Sentiment = require("sentiment");
var nightmareWebsiteFinder = null;
var nightmarArticle1 = null;
var nightmarArticle2 = null;
var nightmarArticle3 = null;

// Package Definitions

//able to find top x number of links in search engine. plan is to scrap it
// TODO pass in the string to scrape.
var array1 = ["#r1-1 a.result__a", "#r1-2 a.result__a", "#r1-5 a.result__a"];
//function to scrape a url, able to work to get all p, w/o scrolling

function terminateNightmare(nm) {
  nm.proc.disconnect();
  nm.proc.kill();
  nm.ended = true;
  nm = null;
}

function scrapingArticle(articleURL, nightmareObject) {
  return new Promise(function(resolve, reject) {
    try {
      var ls;
      nightmareObject
        .goto(articleURL)
        .wait(1500)
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
  }).catch();
}

async function scrapeArticleCallback(articleURL, callback, nm) {
  await scrapingArticle(articleURL, nm)
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

      nightmareWebsiteFinder = Nightmare(
        (show = false),
        (executionTimeout = 15000),
        (gotoTimeout = 10000)
      );

      nightmarArticle1 = Nightmare();
      nightmarArticle2 = Nightmare();
      nightmarArticle3 = Nightmare();

      nightmareWebsiteFinder
        .goto("https://duckduckgo.com")
        .type("#search_form_input_homepage", retVal)
        .click("#search_button_homepage")
        .wait("#r1-4 a.result__a")
        .evaluate(function() {
          console.log(`b, in run func`);
          return document.querySelector("#r1-1 a.result__a").href;
        })
        .then(async function(title) {
          console.log(title);

          if (!title.endsWith(`.pdf`)) {
            await scrapeArticleCallback(
              title,
              function(result) {
                fullList = fullList.concat(result);
              },
              nightmarArticle1
            ).catch();
          }
          nightmareWebsiteFinder
            .evaluate(function() {
              return document.querySelector("#r1-2 a.result__a").href;
            })
            .then(async function(title) {
              console.log(title);
              if (!title.endsWith(`.pdf`)) {
                await scrapeArticleCallback(
                  title,
                  function(result) {
                    fullList = fullList.concat(result);
                    console.log(fullList.length);
                  },
                  nightmarArticle2
                );
              }

              nightmareWebsiteFinder
                .evaluate(function() {
                  return document.querySelector("#r1-3 a.result__a").href;
                })
                .then(function(title) {
                  console.log(title);

                  if (!title.endsWith(`.pdf`)) {
                    scrapeArticleCallback(
                      title,
                      function(result) {
                        //appends to array
                        fullList = fullList.concat(result);
                        resolve(fullList);
                      },
                      nightmarArticle3
                    );
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
  console.log(`running scraper`);

  let result = await stepOneScrapingWorkPromise(retVal);
  console.log("it has returned");
  nightmareWebsiteFinder.end();
  // kill the Electron process explicitly to ensure no orphan child processes
  terminateNightmare(nightmareWebsiteFinder);
  terminateNightmare(nightmarArticle1);
  terminateNightmare(nightmarArticle2);
  terminateNightmare(nightmarArticle3);

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

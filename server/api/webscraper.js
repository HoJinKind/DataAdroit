// Imports
const express = require("express");
const router = express.Router();
const Nightmare = require("nightmare");
const fs = require("fs");
const csvWriter = require("csv-write-stream");
var cheerio = require("cheerio");
const JSSoup = require("jssoup").default;

// Package Definitions
const writer = csvWriter();
const nightmare = Nightmare();

//ablr to find top x number of links in search engine. plan is to scrap it
// TODO pass in the string to scrape.
var array1 = ["#r1-1 a.result__a", "#r1-2 a.result__a", "#r1-5 a.result__a"];

async function scrapingArticle(articleURL, nightmareObject) {
  return new Promise(function(resolve, reject) {
    try {
      var ls;
      nightmareObject
        .goto(articleURL)
        .wait(1000)
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
          console.log(ls[34].text);
          console.log(ls.length);
          resolve(ls[25].text);
        });
    } catch (error) {
      reject("u suck");
      throw error;
    }
  });
}

function getsomedata(articleURL, callback) {
  scrapingArticle(articleURL, new Nightmare())
    .then(function(random_data) {
      callback(random_data);
    })
    .catch(function(e) {
      //handle error here
    });
}

async function run(retVal) {
  try {
    //testing how to read html
    //result is the return value
    getsomedata(
      `https://www.apnews.com/9924c846abf84cfeabb76e6045190b42`,
      function(result) {
        console.log(result);
        console.log("finally return my goodness");
      }
    );

    nightmare
      .goto("https://duckduckgo.com")
      .type("#search_form_input_homepage", retVal)
      .click("#search_button_homepage")
      .wait("#r1-3 a.result__a")
      .evaluate(() => {
        $(document)
          .find("zcm__link  js-zci-link  js-zci-link--news")
          .click();
      })
      .wait("#r1-3 a.result__a")
      .evaluate(function() {
        return document.querySelector("#r1-2 a.result__a").href;
      })
      .then(function(title) {
        console.log(title);
        nightmare
          .evaluate(function() {
            return document.querySelector("#r1-3 a.result__a").href;
          })
          .then(function(title) {
            console.log(title);
            nightmare
              .evaluate(function() {
                return document.querySelector("#r1-4 a.result__a").href;
              })
              .then(function(title) {
                console.log(title);
              });
          });
      });

    // .. do more stuff
    // const second = await nightmare
    //   .evaluate(() => document.querySelector("#r1-2 a.result__a").href)
    //   .end()
    //   .then(function(title) {
    //     console.log(title);
    //   });
  } catch (error) {
    throw error;
  }
}
router.get("/", (req, res) => res.send("about route"));
run(`Donald Trump`);
module.exports = router;

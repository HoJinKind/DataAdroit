// Imports
const express = require("express");
const router = express.Router();
const Nightmare = require("nightmare");
const fs = require("fs");
const csvWriter = require("csv-write-stream");

// Package Definitions
const writer = csvWriter();
const nightmare = Nightmare();

//ablr to find top x number of links in search engine. plan is to scrap it
// TODO pass in the string to scrape.
var array1 = ["#r1-1 a.result__a", "#r1-2 a.result__a", "#r1-5 a.result__a"];
async function run() {
  try {
    nightmare
      .goto("https://duckduckgo.com")
      .type("#search_form_input_homepage", "github nightmare")
      .click("#search_button_homepage")
      .wait("#r1-3 a.result__a")
      .evaluate(function() {
        return document.querySelector("#r1-1 a.result__a").href;
      })
      .then(function(title) {
        console.log(title);
        nightmare
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
run();
module.exports = router;

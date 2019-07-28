const express = require("express");
const router = express.Router();

//@ route GET api/users
//@desc Test route
//access  Public
//by public and private, to access some pages
//need a token, but this is public
router.get("/", (req, res) => {
  var list = ["item1", "item2", "item3", "item4"];
  res.json(list);
  console.log("Sent list of items test endpoint routings");
});

module.exports = router;



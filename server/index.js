const express = require("express");
const path = require("path");

const cors = require("cors");
const app = express();

app.use(cors());
app.options("*", cors());

// request.post('http://www.giantbomb.com/api/search',
//  { form: {
//     api_key: '8101bc61497bd0f542a08dc149368e49c4deee9b',
//     query: 'World of Warcraft: Legion'
//   }
// },(err,res,body)=>{
//   console.log(res)
// })



// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

app.use(express.json({ extended: false }));

app.use("/api/webscrape", require("./api/webscraper"));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(req + __dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);

// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  let params = req.params.date;

  if (!params) {
    const unix = Date.now();
    const date = new Date(unix);
    const formattedDate = date.toUTCString();
    console.log(params);
    res.json({ unix: unix, utc: formattedDate });
    return;
  }

  // transformer la date en unix
  let dateTounix = Date.parse(req.params.date);

  // Vérifier si dateTounix est une date transformer en unix
  if (isNaN(dateTounix)) {
    // Vérifier si c'est déjà un unix
    let timestamp = Number(params);
    if (isNaN(timestamp)) {
      res.json({ error: "Invalid Date" });
    } else {
      const date = new Date(timestamp);
      const formattedDate = date.toUTCString();

      res.json({ unix: timestamp, utc: formattedDate });
    }
  } else {
    const date = new Date(dateTounix);
    const formattedDate = date.toUTCString();
    res.json({ unix: dateTounix, utc: formattedDate });
  }

  //res.json({ unix: dateTounix, utc: unixToDate });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

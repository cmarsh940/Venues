const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const port = 8000;

const app = express();

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static(path.join(__dirname + '/public/dist')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "VenuesSecret",
    resave: false,
    saveUninitialized: true
  })
);
app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true
}));

app.use(busboy());
app.use(busboyBodyParser());

require("./server/config/mongoose");

require("./server/config/api/routes")(app);

app.listen(port, err => {
  if (err) {
    console.log(err);
  }

  console.log(`listening on port ${port}`);
});

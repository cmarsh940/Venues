const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require("path");
const fileUpload = require("express-fileupload");
const port = 8000;

const app = express();

app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static(path.join(__dirname + '/public/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'VenuesSecret',
    resave: false,
    saveUninitialized: true
}));
app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true
}));

require('./server/config/mongoose');

require('./server/config/routes')(app);

app.listen(port, () => console.log(`listening on port ${port}`));
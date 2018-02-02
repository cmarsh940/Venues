const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const path = require("path");
const port = 8000;
const app = express();

app.use(express.static(path.join(__dirname + '/public/dist')));
app.use(bodyParser.json());
app.use(busboy());
app.use(busboyBodyParser());
app.use(morgan('tiny'));
app.use(session({
    secret: "VenuesSecret",
    resave: false,
    saveUninitialized: true
}));

require('./server/config/mongoose');

require('./server/config/routes')(app);

app.listen(port, () => console.log(`listening in port ${port}...`));

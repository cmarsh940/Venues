const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require("path");
const port = 8000;
const app = express();

app.use(express.static(path.join(__dirname + '/public/dist')));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(session({
    secret: "VenuesSecret",
    resave: false,
    saveUninitialized: true
}));

require('./server/config/mongoose');

require('./server/config/routes')(app);

app.listen(port, () => console.log(`listening in port ${port}...`));

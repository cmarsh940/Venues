const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const http = require('http');
const morgan = require('morgan');
const multer = require('multer');
// const busboy = require("connect-busboy");
// const busboyBodyParser = require("busboy-body-parser");
const path = require("path");
let Venue = require('./server/models/venue');
const Gallery = require('./server/models/gallery');
const UPLOAD_DIR = './uploads/';
const port = 8000;

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('Starting Tulsa Venues app in env = ' + env)

const app = express();

app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
app.use(express.static(path.join(__dirname + '/public/dist')));
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(busboy());
// app.use(busboyBodyParser());
app.use(morgan('tiny'));
app.use(session({
    secret: "VenuesSecret",
    resave: false,
    saveUninitialized: true
}));


app.get('/download/:filename/', function (req, res, next) {
    console.log(req.params.filen);
    res.setHeader('content-type', 'image/jpeg');
    res.download(UPLOAD_DIR + req.params.filename);
})

// *** MULTER ***

//Uploader 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const filter = function (req, file, cb) {
    const extension = file.mimetype.split('/')[0];
    if (extension !== 'image') {
        return cb(new Error('Invalid file format'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: filter });
app.post('/upload', upload.single('file'), function (req, res, next) {

    console.log('Uploaded file ', req.file);
    let newVenue = new Venue;

    newVenue.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        console.log('Save successful')
    });
    res.end('success');
    next();
})

require('./server/config/mongoose');
require('./server/config/routes')(app);

const server = http.createServer(app);

app.listen(port, () => console.log(`listening in port ${port}...`));

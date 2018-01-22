const Users = require('../../controllers/users');
const ammenities = require('../../controllers/ammenities');
const venues = require('../../controllers/venues');
const venders = require('../../controllers/venders');
// const config = require('../config');

// const BUCKET_NAME = "venue-test";
// const IAM_USER_KEY = config.iamUser;
// const IAM_USER_SECRET = config.iamSecret;

const path = require('path');
// const AWS = require('aws-sdk');
// const Busboy = require('busboy');

// function uploadToS3(file) {
//   let s3bucket = new AWS.S3({
//     accessKeyId: IAM_USER_KEY,
//     secretAccessKey: IAM_USER_SECRET,
//     Bucket: BUCKET_NAME
//   });
//   s3bucket.createBucket(function() {
//     var params = {
//       Bucket: BUCKET_NAME,
//       Key: file.name,
//       Body: file.data
//     };
//     s3bucket.upload(params, function(err, data) {
//       if (err) {
//         console.log("error in callback");
//         console.log(err);
//       }
//       console.log("success");
//       console.log(data);
//     });
//   });
// }

module.exports = app => {
    app.post("/users", Users.create);
    app.post("/users/destroy", venues.destroy);
    app.get("/all_users", Users.index);
    app.post("/login", Users.authenticate);
    app.delete("/users", Users.logout);
    app.get("/session", Users.session);

    // VENUES
    app.get("/venues", venues.index);
    app.post("/venues/upload", venues.upload);
    app.post("/venues/create", venues.create);
    app.post("/venues/destroy", venues.destroy);
    app.post("/venues/update", venues.update);
    app.post("/venues/id", venues.getOne);

    // VENDER
    app.get("/venders", venders.index);
    app.post("/venders/upload", venders.upload);
    app.post("/venders/create", venders.create);
    app.post("/venders/destroy", venders.destroy);
    app.post("/venders/update", venders.update);
    app.post("/venders/id", venders.getOne);

    // AMMENITIES
    app.get("/ammenities", ammenities.index);
    app.post("/ammenities/add", ammenities.create);
    app.post("/ammenities/destroy", ammenities.destroy);
    app.post("/ammenities/update", ammenities.update);
    app.post("/ammenities/id", ammenities.getOne);

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/index.html"));
    });
};

const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');
const Amenity = mongoose.model('Amenity');

const config = require("../config/config");

const BUCKET_NAME = "venue-test";
const IAM_USER_KEY = config.iamUser;
const IAM_USER_SECRET = config.iamSecret;

const path = require("path");
const AWS = require("aws-sdk");
const Busboy = require("busboy");


function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function() {
    var params = {
      Bucket: BUCKET_NAME,
      Key: `Venues/${file.name}`,
      Body: file.data
    };
    s3bucket.upload(params, function(err, data) {
      if (err) {
        console.log("error in callback");
        console.log(err);
      }
      console.log("success");
      console.log(data);
    });
  });
}

let shuffle = function (arr) {
    for (let i = 0; i < arr.length; i++) {
        let index = Math.floor(Math.random() * arr.length);
        let temp = arr[i];
        arr[i] = arr[index];
        arr[index] = temp;
    }
}

class VenuesController {
    index(req, res) {
        Venue.find({}).populate('amenities', 'name').populate('category').exec((err, venues) => {
            if(err) {
                return res.json(err);
            }
            return res.json(venues);
        })
    }

    getRandom(req, res) {
        Venue.findRandom().limit(1).populate('amenities', 'name').populate('category').exec((err, questions) => {
            if (err) {
                return res.json(err);
            }
            for (let venue of venues) {
                shuffle(venue);
            }
            return res.json(venues);
        });
    }

    create(req, res) {
        Venue.create(req.body, (err, venue) => {
            if (err) {
                return res.json(err);
            }
            return res.json(venue);
        });
    }

    upload(req, res, next) {
        const new_venue = new Venue(req.body);
        var busboy = new Busboy({ headers: req.headers });
        // The file upload has completed
        busboy.on("finish", function() {
            console.log("Upload finished");
            const file = req.files.picture;
            console.log(file);
            uploadToS3(file);
        });
        req.pipe(busboy);
    }



    show(req, res) {
        Venue.findById(req.params.id).populate('amenities', 'name').exec((err, venue) => {
            if (err) {
                return res.json(err);
            }
            return res.json(venue);
        });
    }


    update(req, res) {
        Venue.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true },
            (err, venue) => {
                if (err) {
                    return res.json(err);
                }
                return res.json(venue);
            }
        );
    }

    
    delete(req, res) {
        Venue.findByIdAndRemove(req.params.id, (err, venue) => {
            if (err) {
                return res.json(err);
            } else {
                return res.json(true);
            }
        })
    }
}

module.exports = new VenuesController();

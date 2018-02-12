const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');
const Amenity = mongoose.model('Amenity');

const config = require("../config/config");

const BUCKET_NAME = "tulsa-venues";
const IAM_USER_KEY = config.iamUser;
const IAM_USER_SECRET = config.iamSecret;

const path = require("path");
const AWS = require("aws-sdk");
const Busboy = require("busboy");


function uploadToS3(file, venue) {
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function() {
        var params = {
            Bucket: BUCKET_NAME,
            Key: `Venues/${venue.name}/${file.name}`,
            Body: file.data,
            ACL: 'public-read'
        };
        s3bucket.upload(params, function(err, data) {
        if (err) {
            console.log("*** Error in callback: ", err);
        }
            console.log("success", data);
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

    upload(req, res) {
        let new_venue = new Venue(req.body);
        console.log("*** SERVER SET NEW_VENUE:", new_venue)
        let busboy = new Busboy({ headers: req.headers });
        if (req.files.picture) {
            let file = req.files.picture;
            let file_type = file.mimetype.match(/image\/(\w+)/);
            let new_file_name = file.name;

            if (file_type) {
                new_venue.pic_url = new_file_name;
                busboy.on("finish", function () {
                    const venue = req.body
                    const file = req.files.picture;
                    uploadToS3(file, venue);
                });
                req.pipe(busboy);
            }
        }

        new_venue.save((err, new_venue) => {
            if (err) {
                return res.json(err);
            }
            console.log("**** this is the new venue:", new_venue);
            return res.json(new_venue);
        });
        // new_venue.save()
        //     .then(() => {
        //         return res.json(new_venue);
        //     })
        //     .catch(err => {
        //         console.log("*** my_venue save error", err);
        //         return res.json(err);
        //     });
    }



    show(req, res) {
        Venue.findById(req.params.id).populate('amenities', 'name').populate('category').populate('galleryItems').exec((err, venue) => {
            if (err) {
                return res.json(err);
            }
            return res.json(venue);
        });
    }

    images(req, res) {
        Venue.findById(req.params.id).populate('galleryItems').exec((err, item) => {
            if (err) {
                return res.json(err);
            }
            return res.json(item);
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

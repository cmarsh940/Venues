const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');
const Amenity = mongoose.model('Amenity');

const config = require("../config/config");

// const BUCKET_NAME = "tulsa-venues";
const BUCKET_NAME = "venue-test";
const IAM_USER_KEY = config.iamUser;
const IAM_USER_SECRET = config.iamSecret;

const path = require("path");
const AWS = require("aws-sdk");
const Busboy = require("busboy");


function uploadToS3(file, venue) {
    console.log("*** STARTING TO UPLOADTOS3 FUNCTION")
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
            console.log("*** UPLOAD PARAMS: ", params);
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
        Venue.find({})
          .populate({ path: "amenities", model: "Amenity" })
          .populate({ path: "category", model: "Category" })
          .exec((err, venues) => {
            if (err) {
              return res.json(err);
            }
            shuffle(venues);
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
        Venue.findById(req.params.id, (err, new_venue) => {
            if (err) {
                return handleError(err);
            }

            let busboy = new Busboy({ headers: req.headers });
            if (req.files.picture) {
                let file = req.files.picture;
                console.log("*** SERVER FILE:", file)
                let file_type = file.mimetype.match(/image\/(\w+)/);
                let new_file_name = file.name;

                if (file_type) {
                    venue.pic_url = new_file_name;
                    busboy.on("finish", function () {
                        const venue = req.params.id
                        console.log("**** BUSBOY VENUE:", venue)
                        const file = req.files.picture;
                        uploadToS3(file, venue);
                    });
                    req.pipe(busboy);
                }
            }
            new_venue.pic_url = req.files.name;
            new_venue.save((err, new_venue) => {
                if (err) {
                    return res.json(err);
                }
                console.log("**** this is the new venue:", new_venue);
                return res.json(new_venue);
            });
        })
    }



    show(req, res) {
        Venue.findById(req.params.id).populate('amenities', 'name').populate('category').populate('galleryItems').exec((err, venue) => {
            if (err) {
                return res.json(err);
            }
            return res.json(venue);
        });
    }

    // review(req, res){
    //     Venue.findOne({_id: req.params.id}, (err, venue) =>{
    //         var review = new Review(req.body);
    //         review._venue = venue._id;
    //         venue.reviews.push(review);
    //         review.save(function(err){
    //                 venue.save(function(err){
    //                     if(err) { 
    //                         console.log('Error'); 
    //                     }
    //                     return res.json(venue) 
    //                 });
    //         });
    // });
    // }

    images(req, res) {
        Venue.findById(req.params.id).populate('galleryItems').exec((err, doc) => {
            console.log("*** SERVER IMAGES", doc)
            if (err) {
                res.end("Error while retreaving images");
            } else if (doc.gallerItems.length < 1) {
                res.end("There are no images for this Venue yet")
            } else {
                const key = "Venues" + "/" + venue.name + "/" + venue.galleryItems;
                console.log("*** SERVER S3 KEY:", key)

                let s3bucket = new AWS.S3({
                    accessKeyId: IAM_USER_KEY,
                    secretAccessKey: IAM_USER_SECRET,
                    Bucket: BUCKET_NAME
                });
                s3bucket.createBucket(() => {
                    var params = {
                        Bucket: BUCKET_NAME,
                        Key: key,
                    };
                    s3bucket.getObject(params, (err, data) => {
                    if (err) {
                        console.log("*** S3 Error in callback: ", err);
                        res.end("Error")
                    }
                        console.log("success", data);
                        res.setHeader('Content-Type', data.ContentType);
                        res.end(data.Body);
                    });
                });
            }
        })
    }


    update(req, res) {
        Venue.findByIdAndUpdate(req.params.id,
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

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


function uploadToS3(file, new_venue) {
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
        console.log("*** hit server for creating a venue");
        let new_venue = new Venue(req.body);
        console.log(new_venue);
        if (req.files) {
            let file = req.files;
            console.log("*** server recieved file named:", file);
            let file_type = file.mimetype.match(/image\/(\w+)/);
            console.log("*** server file type", file_type);
            let new_file_name = "";
            console.log("*** Renaming file");
            if (file_type) {
                let new_file_name = `${new Date().getTime()}.${file_type[1]}`;
                console.log("*** Files new name is:", new_file_name);
                file.mv(path.resolve(__dirname, "../../upload", new_file_name), err => {
                    if (err) {
                        console.log("*** file move error", err);
                    }
                });
                console.log("*** Files is now moved to uploads folder");
                new_venue.pic_url = new_file_name;
            } else{
                console.log("****** not file_type")
                return
            }
        } else {
            console.log("****** not files")
            return
        }
        new_venue.save()
            .then(() => {
                return res.json(new_venue);
            })
            .catch(err => {
                console.log("*** my_venue save error", err);
                return res.json(err);
            });
    }

    // create(req, res) {
    //     Venue.create(req.body, (err, venue) => {
    //         if (err) {
    //             return res.json(err);
    //         }
    //         return res.json(venue);
    //     });
    // }

    upload(req, res, next) {
        let new_venue = new Venue(req.body);
        let busboy = new Busboy({ headers: req.headers });
        if (req.files.picture) {
            let file = req.files.picture;
            console.log("*** server recieved file named:", file);
            let file_type = file.mimetype.match(/image\/(\w+)/);
            console.log("*** server file type", file_type);
            let new_file_name = file.name;

            if (file_type) {
                new_venue.pic_url = new_file_name;
                busboy.on("finish", function () {
                    const file = req.files.picture;
                    console.log("Done parsing form!");
                    console.log(file);
                    uploadToS3(file);
                });
                req.pipe(busboy);
                console.log("*** Files is now uploaded");
            }
        }

        new_venue.save()
            .then(() => {
                return res.json(new_venue);
            })
            .catch(err => {
                console.log("*** my_venue save error", err);
                return res.json(err);
            });
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

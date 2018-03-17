const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');
const Category = mongoose.model('Category');
const Amenity = mongoose.model('Amenity');
const Review = mongoose.model("Review");

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
    console.log("*** S3 FILE:", file)
    console.log("*** S3 VENUE", venue)
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function() {
        var params = {
            Bucket: BUCKET_NAME,
            Key: `Venues/${venue}/${file.name}`,
            Body: file.data,
            ACL: 'public-read'
        };
        s3bucket.upload(params, function(err, data) {
        if (err) {
            console.log("*** Error in callback: ", err);
            console.log("*** UPLOAD PARAMS: ", params);
        }
            console.log("**** SUCCESS", data);
        });
    });
}

function uploadVideoPicToS3(file, venue) {
    console.log("*** SERVER VIDEO FILE:", file);
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function() {
        var params = {
            Bucket: BUCKET_NAME,
            Key: `Venues/${venue}/VideoPic/${file.name}`,
            Body: file.data,
            ACL: 'public-read'
        };
        s3bucket.upload(params, function(err, data) {
        if (err) {
            console.log("*** Error in callback: ", err);
            console.log("*** UPLOAD PARAMS: ", params);
        }
            console.log("**** SUCCESS", data);
        });
    });
}

function uploadTourPicToS3(file, venue) {
  console.log("*** SERVER TOUR FILE:", file)
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function() {
        var params = {
            Bucket: BUCKET_NAME,
            Key: `Venues/${venue}/TourPic/${file.name}`,
            Body: file.data,
            ACL: 'public-read'
        };
        s3bucket.upload(params, function(err, data) {
        if (err) {
            console.log("*** Error in callback: ", err);
            console.log("*** UPLOAD PARAMS: ", params);
        }
            console.log("**** SUCCESS", data);
        });
    });
}

function uploadManyToS3(file, venue) {
    console.log("*** STARTING TO UPLOADTOS3 FUNCTION")
    console.log("*** S3 FILE:", file)
    console.log("*** S3 VENUE", venue)
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function() {
        var params = {
            Bucket: BUCKET_NAME,
            Key: `Venues/${venue}/Gallery/${file.name}`,
            Body: file.data,
            ACL: 'public-read'
        };
        s3bucket.upload(params, function(err, data) {
        if (err) {
            console.log("*** Error in callback: ", err);
            console.log("*** UPLOAD PARAMS: ", params);
        }
            console.log("**** SUCCESS", data);
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


//  James wagner's example(signed url)
// var aws2 = new AWS.S3({
//   accessKeyId: IAM_USER_KEY,
//   secretAccessKey: IAM_USER_SECRET,
//   Bucket: BUCKET_NAME
// });

// aws2.getSignedUrl(
//   "putObject",
//   {
//     Bucket: "venue-test",
//     Key: "folder/another/test.jpg",
//     ContentType: "image/jpeg"
//   },
//   (err, url) => {
//     console.log(url);
//   }
// );

class VenuesController {
  index(req, res) {
    Venue.find({})
      .populate({ path: "amenities", model: Amenity })
      .populate({ path: "reviews", model: Review })
      .populate({ path: "_category", model: Category })
      .exec((err, venues) => {
        if (err) {
          return res.json(err);
        }
        shuffle(venues);
        return res.json(venues);
      });
  }

  show(req, res) {
    Venue.findById({ _id: req.params.id })
      .populate({ path: "amenities", model: Amenity })
      .populate({ path: "_category", model: Category })
      .populate({ path: "reviews", model: Review })
      .exec((err, venue) => {
        if (err) {
          console.log("*** SERVER SHOW VENUE ERROR:", err);
          return res.json(err);
        }
        return res.json(venue);
      });
  }

  category(req, res) {
    Venue.find({ _category: req.params.category })
      .populate({ path: "_category", model: Category })
      .exec((err, venues) => {
        if (err) {
          console.log("*** SERVER FIND ERROR:", err);
          return res.json(err);
        }
        shuffle(venues);
        console.log("*** SERVER SENDING VENUES:", venues);
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
    let busboy = new Busboy({ headers: req.headers });
    if (req.files.picture) {
      let file = req.files.picture;
      let file_type = file.mimetype.match(/image\/(\w+)/);
      let new_file_name = file.name;

      if (file_type) {
        new_venue.pic_url = new_file_name;
        busboy.on("finish", function() {
          const venue = req.params.id;
          const file = req.files.picture;
          uploadToS3(file, venue);
        });
        req.pipe(busboy);
      }
    }
    Venue.update(
      { _id: req.params.id },
      { $set: { pic_url: new_venue.pic_url } }
    ).exec((err, new_venue) => {
      if (err) {
        return res.status(204).json(err);
      }
      return res.json(new_venue);
    });
  }

  uploadVideoPic(req, res) {
    let new_venue = new Venue(req.body);
    let busboy = new Busboy({ headers: req.headers });
    if (req.files.picture) {
      let file = req.files.picture;
      let file_type = file.mimetype.match(/image\/(\w+)/);
      let new_file_name = file.name;

      if (file_type) {
        new_venue.videoPicURL = new_file_name;
        busboy.on("finish", function() {
          const venue = req.params.id;
          const file = req.files.picture;
          console.log("*** SERVER FILE:", file);
          uploadVideoPicToS3(file, venue);
        });
        req.pipe(busboy);
      }
    }
    Venue.update(
      { _id: req.params.id },
      { $set: { videoPicURL: new_venue.videoPicURL } }
    ).exec((err, new_venue) => {
      if (err) {
        return res.status(204).json(err);
      }
      return res.json(new_venue);
    });
  }

  uploadTourPic(req, res) {
    let new_venue = new Venue(req.body);
    let busboy = new Busboy({ headers: req.headers });
    if (req.files.picture) {
      let file = req.files.picture;
      let file_type = file.mimetype.match(/image\/(\w+)/);
      let new_file_name = file.name;

      if (file_type) {
        new_venue.tourPicURL = new_file_name;
        busboy.on("finish", function() {
          const venue = req.params.id;
          const file = req.files.picture;
          uploadTourPicToS3(file, venue);
        });
        req.pipe(busboy);
      }
    }
    Venue.update(
      { _id: req.params.id },
      { $set: { tourPicURL: new_venue.tourPicURL } }
    ).exec((err, new_venue) => {
      if (err) {
        return res.status(204).json(err);
      }
      return res.json(new_venue);
    });
  }

  gallery(req, res) {
    let new_venue = new Venue(req.body);
    let busboy = new Busboy({ headers: req.headers });
    if (req.files.picture) {
      let file = req.files.picture;
      let file_type = file.mimetype.match(/image\/(\w+)/);
      let new_file_name = file.name;

      if (file_type) {
        new_venue.gallery.push(new_file_name);
        busboy.on("finish", function() {
          const venue = req.params.id;
          const file = req.files.picture;
          uploadManyToS3(file, venue);
        });
        req.pipe(busboy);
      }
    }
    let gallery = req.files.picture;
    Venue.update({ _id: req.params.id }, { $push: { gallery: gallery } }).exec(
      (err, new_venue) => {
        if (err) {
          return res.status(204).json(err);
        }
        return res.json(new_venue);
      }
    );
  }
  // gallery(req, res) {
  //   let new_venue = new Venue(req.body);
  //   let busboy = new Busboy({ headers: req.headers });
  //   console.log("*** SERVER REQ.FILES:", req.files);
  //   console.log("*** SERVER REQ.FILES.PICTURE:", req.files.picture);
  //   for (let i = 0; i < req.files.length; i++) {
  //     if (req.files.picture) {
  //       let file = req.files.picture;
  //       let file_type = file.mimetype.match(/image\/(\w+)/);
  //       let new_file_name = file.name;

  //       if (file_type) {
  //         new_venue.galleryItems = new_file_name;
  //         busboy.on("finish", function() {
  //           const venue = req.params.id;
  //           const file = req.files.picture;
  //           uploadToS3(file, venue);
  //         });
  //         req.pipe(busboy);
  //       }
  //     }
  //   }
  //   // req.body.files = venue._id;
  //   Gallery.create(
  //     req.body.files,
  //     (err, files) => {
  //       if (err) {
  //         return res.json(err);
  //       }
  //     }),

  //     new_venue.galleryItems.push(req.body.files);

  //     Venue.update(
  //       { _id: req.params.id },
  //       { $set: [{ galleryItems: { objectId: files._id } }] }
  //     ).exec((err, new_venue) => {
  //       if (err) {
  //         return res.json(err);
  //       }
  //       return res.json(new_venue);
  //     }
  //   )
  // }

  review(req, res) {
    Venue.find({ _id: req.params.id }, (err, venue) => {
      let review = new Review(req.body);
      review._venue = venue._id;
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      if (venue) {
        Venue.update(
          { _id: req.params.id },
          { $push: { reviews: review } }
        ).exec((err, venue) => {
          if (err) {
            return res.json(err);
          }
          console.log("*** SERVER REVIEW:", venue);
          return res.json(venue);
        });
      }
    });
  }

  images(req, res) {
    Venue.findById(req.params.id)
      .populate("galleryItems")
      .exec((err, doc) => {
        console.log("*** SERVER IMAGES", doc);
        if (err) {
          res.end("Error while retreaving images");
        } else if (doc.gallerItems.length < 1) {
          res.end("There are no images for this Venue yet");
        } else {
          const key = "Venues" + "/" + venue.name + "/" + venue.galleryItems;
          console.log("*** SERVER S3 KEY:", key);

          let s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            Bucket: BUCKET_NAME
          });
          s3bucket.createBucket(() => {
            var params = {
              Bucket: BUCKET_NAME,
              Key: key
            };
            s3bucket.getObject(params, (err, data) => {
              if (err) {
                console.log("*** S3 Error in callback: ", err);
                res.end("Error");
              }
              console.log("success", data);
              res.setHeader("Content-Type", data.ContentType);
              res.end(data.Body);
            });
          });
        }
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
    });
  }
}

module.exports = new VenuesController();

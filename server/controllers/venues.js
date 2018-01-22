const mongoose = require("mongoose")
const Venue = mongoose.model("Venue")

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

mongoose.Promise = global.Promise;

module.exports = {
  // index: (req, res, next) => {
  //   const DOWNLOAD = false;

  //   const {
  //     pic_url,
  //   } = req.query;
  //   // id would be keithweaver_ (so ?id=keithweaver_)

  //   // Now retrieve the S3 key
  //   const s3Key = pic_url;
  //   // I assume you have installed the AWS SDK
  //   let s3bucket = new AWS.S3({
  //     accessKeyId: IAM_USER_KEY,
  //     secretAccessKey: IAM_USER_SECRET,
  //     Bucket: BUCKET_NAME
  //   });
  //   s3bucket.createBucket(() => {
  //     s3bucket.getObject({
  //       Bucket: BUCKET_NAME,
  //       Key: s3Key
  //     }, (err, data) => {
  //       if (DOWNLOAD) { // This is hardcoded to download in browser
  //         res.setHeader('Content-disposition', 'attachment; filename=' + s3Key);
  //         res.setHeader('Content-length', data.ContentLength);
  //         res.end(data.Body);
  //       } else {

  //         // res.setHeader("Content-Type: {$result['ContentType']}");
  //         res.setHeader('Content-disposition', 'attachment; filename=' + s3Key);
  //         res.end(data.Body);
  //       }
  //     }); // end of getObject
  //   }); // end of create Bucket
  //   Venue.find()
  //     .then(data => res.json(data))
  //     .catch(err => {
  //       res.status(500).json(err);
  //     });
  // },
  index: (req, res, next) => {
    Venue.find()
      .then(data => res.json(data))
      .catch(err => {
        res.status(500).json(err);
      });
  },

  upload: (req, res, next) => {
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
        busboy.on("finish", function() {
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
  },

  // OLD SEND TO AWS S3
  // upload: (req, res, next) => {
  //   const new_venue = new Venue(req.body);
  //   var busboy = new Busboy({ headers: req.headers });
  //   // The file upload has completed
  //   busboy.on("finish", function() {
  //     console.log("Upload finished");
  //     const file = req.files.picture;
  //     console.log(file);
  //     uploadToS3(file);
  //   });
  //   req.pipe(busboy);
  // },

  create: (req, res) => {
    console.log("*** hit server for creating a venue");
    let new_venue = new Venue(req.body);
    console.log(new_venue);
    if (req.files.picture) {
      let file = req.files.picture;
      console.log("*** server recieved file named:", file);
      let file_type = file.mimetype.match(/image\/(\w+)/);
      console.log("*** server file type", file_type);
      let new_file_name = "";
      console.log("*** Renaming file");
      if (file_type) {
        let new_file_name = `${new Date().getTime()}.${file_type[1]}`;
        console.log("*** Files new name is:", new_file_name);
        file.mv(path.resolve(__dirname, "../../static/imgs/", new_file_name), err => {
          if (err) {
            console.log("*** file move error", err);
          }
        });
        console.log("*** Files is now moved to uploads folder");
        new_venue.static_pic_url = new_file_name;
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
  },

  destroy: (req, res, next) => {
    console.log("*** logging the req.body", req.body);
    let venue = new Venue(req.body);
    console.log("*** logging the new venue to be deleted", venue);
    Venue.findByIdAndRemove({ _id: venue._id }, (err, venue) => {
      if (err) {
        return next(err);
      }
      console.log("*** Deleted venue")
      return res.json(true);
    });
  },




  update: (req, res, next) => {
    console.log("*** logging the update req.body", req.body);
    let myVenue = new Venue(req.body);
    Venue.findOne({ _id: myVenue._id }) //update makes you find one
      .then(venue => {
        console.log("*** successfully found one");
        venue.name = myVenue.name;
        venue.email = myVenue.email;
        venue.phone = myVenue.phone;
        venue.address = myVenue.address;
        venue.website = myVenue.website;
        venue.lat = myVenue.lat;
        venue.lng = myVenue.lng;
        venue.minAmmount = myVenue.minAmmount;
        venue.maxAmmount = myVenue.maxAmmount;
        venue
          .save()
          .then(() => {
            res.json(true);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  getOne: (req, res, next) => {
    console.log("*** logging the body for getting one venue", req.body);
    Venue.findOne({ _id: req.body.venue_id })
      .then(venue => {
        console.log("*** found me a venue", venue);
        res.json(venue);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};


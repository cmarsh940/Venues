const mongoose = require("mongoose")
const Vender = mongoose.model("Vender")

const config = require("../config/config");

// const BUCKET_NAME = "venue-test";
// const IAM_USER_KEY = config.iamUser;
// const IAM_USER_SECRET = config.iamSecret;

// const path = require("path");
// const AWS = require("aws-sdk");
// const Busboy = require("busboy");


// function uploadToS3(file) {
//     let s3bucket = new AWS.S3({
//         accessKeyId: IAM_USER_KEY,
//         secretAccessKey: IAM_USER_SECRET,
//         Bucket: BUCKET_NAME
//     });
//     s3bucket.createBucket(function () {
//         var params = {
//             Bucket: BUCKET_NAME,
//             Key: `Venues/${file.name}`,
//             Body: file.data
//         };
//         s3bucket.upload(params, function (err, data) {
//             if (err) {
//                 console.log("error in callback");
//                 console.log(err);
//             }
//             console.log("success");
//             console.log(data);
//         });
//     });
// }

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
        Vender.find()
            .then(data => res.json(data))
            .catch(err => {
                res.status(500).json(err);
            });
    },

    upload: (req, res, next) => {
        let new_vender = new Vender(req.body);
        let busboy = new Busboy({ headers: req.headers });
        if (req.files.picture) {
            let file = req.files.picture;
            console.log("*** server recieved file named:", file);
            let file_type = file.mimetype.match(/image\/(\w+)/);
            console.log("*** server file type", file_type);
            let new_file_name = file.name;

            if (file_type) {
                new_vender.pic_url = new_file_name;
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

        new_vender
            .save()
            .then(() => {
                return res.json(new_vender);
            })
            .catch(err => {
                console.log("*** my_vender save error", err);
                return res.json(err);
            });
    },

    // OLD SEND TO AWS S3
    // upload: (req, res, next) => {
    //   const new_vender = new Vender(req.body);
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
        console.log("*** hit server for creating a vender");
        if(req.method === 'POST') {
            var busboy = new Busboy({ headers: req.headers });
            busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
                file.on('data', function (data) {
                    console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
                });
                file.on('end', function () {
                    console.log('File [' + fieldname + '] Finished');
                });
            });
            busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
                console.log('Field [' + fieldname + ']: value: ' + inspect(val));
            });
            busboy.on('finish', function () {
                console.log('Done parsing form!');
                res.writeHead(303, { Connection: 'close', Location: '/' });
                res.end();
            });
            req.pipe(busboy);
        }

        new_vender.save()
            .then(() => {
                return res.json(new_vender);
            })
            .catch(err => {
                console.log("*** my_vender save error", err);
                return res.json(err);
            });
    },
        
    // create: (req, res) => {
    //     console.log("*** hit server for creating a vender");
    //     let new_vender = new Vender(req.body);
    //     console.log(new_vender);
    //     if (req.files.picture) {
    //         let file = req.files.picture;
    //         console.log("*** server recieved file named:", file);
    //         let file_type = file.mimetype.match(/image\/(\w+)/);
    //         console.log("*** server file type", file_type);
    //         let new_file_name = "";
    //         console.log("*** Renaming file");
    //         if (file_type) {
    //             let new_file_name = `${new Date().getTime()}.${file_type[1]}`;
    //             console.log("*** Files new name is:", new_file_name);
    //             file.mv(path.resolve(__dirname, "../../static/imgs/", new_file_name), err => {
    //                 if (err) {
    //                     console.log("*** file move error", err);
    //                 }
    //             });
    //             console.log("*** Files is now moved to uploads folder");
    //             new_vender.static_pic_url = new_file_name;
    //         }
    //     }

    //     new_vender.save()
    //         .then(() => {
    //             return res.json(new_vender);
    //         })
    //         .catch(err => {
    //             console.log("*** my_vender save error", err);
    //             return res.json(err);
    //         });
    // },

    // destroy: (req, res, next) => {
    //     console.log("*** logging the req.body", req.body);
    //     let vender = new Vender(req.body);
    //     console.log("*** logging the new vender to be deleted", vender);
    //     Vender.findByIdAndRemove({ _id: vender._id }, (err, vender) => {
    //         if (err) {
    //             return next(err);
    //         }
    //         console.log("*** Deleted vender")
    //         return res.json(true);
    //     });
    // },




    update: (req, res, next) => {
        console.log("*** logging the update req.body", req.body);
        let myVender = new Vender(req.body);
        Vender.findOne({ _id: myVender._id }) //update makes you find one
            .then(vender => {
                console.log("*** successfully found one");
                vender.name = myVender.name;
                vender.email = myVender.email;
                vender.phone = myVender.phone;
                vender.address = myVender.address;
                vender.website = myVender.website;
                vender
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
        console.log("*** logging the body for getting one vender", req.body);
        Vender.findOne({ _id: req.body.vender_id })
            .then(vender => {
                console.log("*** found me a vender", vender);
                res.json(vender);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
};


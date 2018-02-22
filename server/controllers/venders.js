const mongoose = require('mongoose');
const Vender = mongoose.model('Vender');

const config = require("../config/config");

const BUCKET_NAME = "tulsa-venues";
// const BUCKET_NAME = "venue-test";
const IAM_USER_KEY = config.iamUser;
const IAM_USER_SECRET = config.iamSecret;

const path = require("path");
const AWS = require("aws-sdk");
const Busboy = require("busboy");


function uploadToS3(file, vender) {
    console.log("*** upload function vender:", vender)
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function () {
        var params = {
            Bucket: BUCKET_NAME,
            Key: `Venders/${vender.name}/${file.name}`,
            Body: file.data,
            ACL: 'public-read'
        };
        s3bucket.upload(params, function (err, data) {
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

class VendersController {
    index(req, res) {
        Vender.find({}, (err, venders) => {
            if (err) {
                return res.json(err);
            }
            shuffle(venders);
            return res.json(venders);
        });
    }

    create(req, res) {
        Vender.create(req.body, (err, vender) => {
            if (err) {
                return res.json(err);
            }
            return res.json(vender);
        });
    }

    upload(req, res) {
        let new_vender = new Vender(req.body);
        let busboy = new Busboy({ headers: req.headers });
        if (req.files.picture) {
            let file = req.files.picture;
            let file_type = file.mimetype.match(/image\/(\w+)/);
            let new_file_name = file.name;

            if (file_type) {
                new_vender.pic_url = new_file_name;
                busboy.on("finish", function () {
                    const vender = req.body
                    const file = req.files.picture;
                    uploadToS3(file, vender);
                });
                req.pipe(busboy);
            }
        }

        new_vender.save((err, new_vender) => {
            if (err) {
                return res.json(err);
            }
            return res.json(new_vender);
        });
    }

    show(req, res) {
        Vender.findById(req.params.id, (err, vender) => {
            if (err) {
                return res.json(err);
            }
            return res.json(vender);
        });
    }

    update(req, res) {
        Vender.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true },
            (err, vender) => {
                if (err) {
                    return res.json(err);
                }
                return res.json(vender);
            }
        );
    }



    delete(req, res) {
        Vender.findByIdAndRemove(req.params.id, (err, vender) => {
            if (err) {
                return res.json(err);
            } else {
                return res.json(true);
            }
        })
    }
}

module.exports = new VendersController();

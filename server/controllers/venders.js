const mongoose = require("mongoose")
const Vender = mongoose.model("Vender")

const path = require("path");

let shuffle = function (arr) {
    for (let i = 0; i < arr.length; i++) {
        let index = Math.floor(Math.random() * arr.length);
        let temp = arr[i];
        arr[i] = arr[index];
        arr[index] = temp;
    }
}

class VendersController {

    index(req, res, next) {
        Vender.find({})
            .then(data => res.json(data))
            .catch(err => {
                res.status(500).json(err);
            });
    }
        
    create(req, res, next) {
        console.log("*** hit server for creating a vender");
        let new_vender = new Vender(req.body);
        console.log(new_vender);
        if (req.files.picture) {
            let file = req.files.picture;
            console.log("******** REQ.FILE IS :", req.files)
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
                new_vender.static_pic_url = new_file_name;
            }
        }

        new_vender.save()
            .then(() => {
                return res.json(new_vender);
            })
            .catch(err => {
                console.log("*** my_vender save error", err);
                return res.json(err);
            });
    }

    destroy(req, res, next) {
        console.log("*** logging the req.body", req.body);
        let vender = new Vender(req.body);
        console.log("*** logging the new vender to be deleted", vender);
        Vender.findByIdAndRemove({ _id: vender._id }, (err, vender) => {
            if (err) {
                return next(err);
            }
            console.log("*** Deleted vender")
            return res.json(true);
        });
    }




    update(req, res, next) {
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
    }

    getOne(req, res, next) {
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

module.exports = new VendersController();
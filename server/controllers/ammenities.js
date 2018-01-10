const path = require("path")

const mongoose = require("mongoose")
const Ammenity = mongoose.model("Ammenity")

mongoose.Promise = global.Promise;
module.exports = {
    index: (req, res, next) => {
        Ammenity.find()
        .then(data => res.json(data))
        .catch(err => {
            res.status(500).json(err);
        });
    },

    upload(req, res){
        Ammenity.create(req.body, (err, ammenity) => {
            if (err) {
                return res.json(err);
            }
            return res.json(ammenity);
        });
    },

    destroy: (req, res, next) => {
        console.log("logging the req.body", req.body);
        let ammenity = new Ammenity(req.body);
        console.log("logging the new ammenity to be destroyed", ammenity);
        Ammenity.remove({ _id: ammenity._id })
        .then(() => {
            res.json(true);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    },

    update: (req, res, next) => {
        console.log("logging the update req.body", req.body);
        let myAmmenity = new Ammenity(req.body);
        Ammenity.findOne({ _id: myAmmenity._id }) //update makes you find one
        .then(ammenity => {
            console.log("successfully found one");
            ammenity.name = myAmmenity.name;
            ammenity.save()
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
        console.log("logging the body for getting one ammenity", req.body);
        Ammenity.findOne({ _id: req.body.ammenity_id })
        .then(ammenity => {
            console.log("found me a ammenity", ammenity);
            res.json(ammenity);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }
};
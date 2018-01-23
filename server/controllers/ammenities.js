const mongoose = require("mongoose")
const Ammenity = mongoose.model("Ammenity")

const path = require("path")

class AmmenitiesController {
  index(req, res, next) {
    Ammenity.find()
      .then(data => res.json(data))
      .catch(err => {
        res.status(500).json(err);
      });
  }

  create(req, res) {
    Ammenity.create(req.body, (err, ammenity) => {
      console.log("*** logging the req.body", req.body);
      if (err) {
        console.log("*** ERROR at create on server", err)
        return res.json(err);
      }
      console.log("*** Created Ammenity")
      return res.json(ammenity);
    });
  }

  destroy(req, res, next) {
    console.log("*** logging the req.body", req.body);
    let ammenity = new Ammenity(req.body);
    console.log("*** logging the new ammenity to be deleted", ammenity);
    Ammenity.findByIdAndRemove({ _id: ammenity._id }, (err, ammenity) => {
      if (err) {
        return next(err);
      }
      console.log("*** Deleted Ammenity")
      return res.json(true);
    });
  }

  update(req, res, next) {
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
  }

  getOne(req, res, next) {
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

module.exports = new AmmenitiesController();
const path = require("path")

const mongoose = require("mongoose")
const City = mongoose.model("City")

mongoose.Promise = global.Promise;
module.exports = {
    index: (req, res, next) => {
        City.find()
            .then(data => res.json(data))
            .catch(err => { res.status(500).json(err) })
    },
    upload: (req, res) => {

        let new_city = new City(req.body)
        new_city.save()
            .then(() => {
                return res.json(new_city)
            })
            .catch(err => {
                console.log("*** my_city save error", err)
                return res.json(err)
            })
    },
    destroy: (req, res, next) => {
        console.log('logging the req.body', req.body)
        let city = new City(req.body);
        console.log("logging the new city to be destroyed", city)
        City.remove({ _id: city._id })
            .then(() => {
                res.json(true);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    },
    update: (req, res, next) => {
        console.log("logging the update req.body", req.body)
        let myCity = new City(req.body)
        City.findOne({ _id: myCity._id }) //update makes you find one
            .then((doctor) => {
                console.log('successfully found one')
                city.name = myCity.name
                city.save()
                    .then(() => { res.json(true) })
                    .catch((err) => { res.status(500).json(err) })
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    },
    getOne: (req, res, next) => {
        console.log('logging the body for getting one city', req.body)
        City.findOne({ _id: req.body.city_id })
            .then((city) => {
                console.log('found me a city', city)
                res.json(city)
            })
            .catch((err) => {
                res.status(500).json(err);
            })

    }
}
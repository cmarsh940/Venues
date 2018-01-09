const path = require("path")

const mongoose = require("mongoose")
const Venue = mongoose.model("Venue")

mongoose.Promise = global.Promise;
module.exports = {
    index: (req, res, next) => {
        Venue.find()
            .then(data => res.json(data))
            .catch(err => { res.status(500).json(err) })
    },
    upload: (req, res) => {
        console.log("*** hit server for creating a venue")
        let new_venue = new Venue(req.body)
        console.log(new_venue)
        if (req.files.picture) {
            let file = req.files.picture
            console.log("*** server recieved file named:", file)
            let file_type = file.mimetype.match(/image\/(\w+)/)
            console.log("*** server file type", file_type)
            let new_file_name = ""
            console.log("*** Renaming file")

            if (file_type) {
                let new_file_name = `${new Date().getTime()}.${file_type[1]}`
                console.log("*** Files new name is:", new_file_name)
                file.mv(path.resolve(__dirname, "../../static/imgs/", new_file_name), err => {
                    if (err) { console.log("*** file move error", err) }
                })
                console.log("*** Files is now moved to uploads folder")
                new_venue.pic_url = new_file_name
            }
        }

        new_venue.save()
            .then(() => {
                return res.json(new_venue)
            })
            .catch(err => {
                console.log("*** my_venue save error", err)
                return res.json(err)
            })
    },
    destroy: (req, res, next) => {
        console.log('*** logging the req.body', req.body)
        let venue = new Venue(req.body);
        console.log("*** logging the venue that is going to be destroid", venue)
        Venue.remove({ _id: venue._id })
            .then(() => {
                res.json(true);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    },
    
    update: (req, res, next) => {
        console.log("*** logging the update req.body", req.body)
        let myVenue = new Venue(req.body)
        Venue.findOne({ _id: myVenue._id }) //update makes you find one
            .then((venue) => {
                console.log('*** successfully found one')
                venue.name = myVenue.name
                venue.email = myVenue.email
                venue.phone = myVenue.phone
                venue.address = myVenue.address
                venue.website = myVenue.website
                venue.save()
                    .then(() => { res.json(true) })
                    .catch((err) => { res.status(500).json(err) })
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    },

    getOne: (req, res, next) => {
        console.log('*** logging the body for getting one venue', req.body)
        Venue.findOne({ _id: req.body.venue_id })
            .then((venue) => {
                console.log('*** found me a venue', venue)
                res.json(venue)
            })
            .catch((err) => {
                res.status(500).json(err);
            })

    }
}


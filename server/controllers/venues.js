const mongoose = require('mongoose');
const Venue = mongoose.model('Venue');

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
        Venue.find({}).populate('amenities').exec((err, venues) => {
            if(err) {
                return res.json(err);
            }
            return res.json(venues);
        })
    }

    getRandom(req, res) {
        Venue.findRandom().limit(parseInt(req.params.num, (err, venues) => {
            if (err) {
                return res.json(err);
            }
            for (let venue of venues) {
                shuffle(venue);
            }
            return res.json(venues);
        }));
    }


    create(req, res) {
        Venue.create(req.body, (err, venue) => {
            if (err) {
                return res.json(err);
            }
            return res.json(venue);
        });
    }



    show(req, res) {
        Venue.findById(req.params.id, (err, venue) => {
            if (err) {
                return res.json(err);
            }
            return res.json(venue);
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

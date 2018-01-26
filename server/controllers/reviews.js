const mongoose = require('mongoose');
const Review = mongoose.model('Review');

class ReviewsController {
    index(req, res) {
        Review.find({}, (err, reviews) => {
            if (err) {
                return res.json(err);
            }
            return res.json(reviews);
        });
    }


    create(req, res) {
        Review.create(req.body, (err, review) => {
            if (err) {
                return res.json(err);
            }
            return res.json(review);
        });
    }



    show(req, res) {
        Review.findById(req.params.id, (err, review) => {
            if (err) {
                return res.json(err);
            }
            return res.json(review);
        });
    }

    update(req, res) {
        Review.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true },
            (err, review) => {
                if (err) {
                    return res.json(err);
                }
                return res.json(review);
            }
        );
    }



    delete(req, res) {
        Review.findByIdAndRemove(req.params.id, (err, review) => {
            if (err) {
                return res.json(err);
            } else {
                return res.json(true);
            }
        })
    }
}

module.exports = new ReviewsController();
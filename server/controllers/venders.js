const mongoose = require('mongoose');
const Vender = mongoose.model('Vender');

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
            return res.json(venders);
        });
    }

    getRandom(req, res) {
        Vender.findRandom().limit(parseInt(req.params.num, (err, venders) => {
            if (err) {
                return res.json(err);
            }
            for (let vender of venders) {
                shuffle(vender);
            }
            return res.json(venders);
        }));
    }


    create(req, res) {
        Vender.create(req.body, (err, vender) => {
            if (err) {
                return res.json(err);
            }
            return res.json(vender);
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

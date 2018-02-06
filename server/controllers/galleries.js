const mongoose = require('mongoose');
const Gallery = mongoose.model('Gallery');

class GalleriesController {

    index(req, res) {
        console.log("Get All Records")
        Gallery.find({}, (err, galleryItems) => {
            if (err) {
                return res.status(500).json({
                    status: 'failed',
                    error: error
                });
            }
            res.status(200).json({
                status: 'success',
                obj: galleryItems
            });
        });
    }

    delete(req, res, next) {
        console.log("Going to delete ", req.params.id)
        Gallery.findById(req.params.id, (err, item) => {
            if (err) {
                return res.status(500).json({
                    status: 'An error occured',
                    error: err
                });
            }
            if (!item) {
                return res.status(500).json({
                    status: 'Item not found ',
                    error: err
                });
            }
            item.isDeleted = true;
            item.save((err, result) => {
                if (err) {
                    return res.status(500).json({
                        status: 'failed',
                        error: error
                    });
                }
                console.log('Deletion successful');
                res.status(200).json({
                    status: 'success',
                    obj: result
                });
            });
        });
    }

    deleteMultiple(req, res, next) {
        let list = req.body;
        if (list && list.length > 0) {
            var updates = [];
            list.forEach(function (obj) {
                var updatePromise = Gallery.update({ _id: obj }, { $set: { isDeleted: true } });
                updates.push(updatePromise);
            });
            Promise.all(updates).then(function (results) {
                console.log(results);
                res.status(200).json({
                    status: 'success',
                    obj: results
                });
            });
        }
    }
}

module.exports = new GalleriesController();
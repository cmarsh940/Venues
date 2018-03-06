const path = require('path');
const Users = require('../controllers/users');
const Venues = require('../controllers/venues');
const Venders = require('../controllers/venders');
const Reviews = require('../controllers/reviews');
const Amenities = require('../controllers/amenities');
const Categories = require('../controllers/categories');
const Galleries = require('../controllers/galleries');

module.exports = function (app) {
    app.get('/users', Users.index);
    app.post('/users', Users.create);
    app.delete('/users', Users.logout);
    app.post('/users/login', Users.authenticate);
    app.delete('/users/:id', Users.delete);
    app.get('/users/:id', Users.show);
    app.put('/users/:id', Users.update);
    app.get('/session', Users.session);

    app.get('/amenities', Amenities.index);
    app.post('/amenities', Amenities.create);
    app.delete('/amenities/:id', Amenities.delete);
    app.get('/amenities/:id', Amenities.show);
    app.put('/amenities/:id', Amenities.update);

    app.get('/categories', Categories.index);
    app.post('/categories', Categories.create);
    app.delete('/categories/:id', Categories.delete);
    app.get('/categories/:id', Categories.show);
    app.put('/categories/:id', Categories.update);

    // app.get('/galleries', Galleries.index);
    // app.post('/galleries', Galleries.create);
    // app.delete('galleries/:id', Galleries.delete);
    // app.delete('/deleteMultiple', Galleries.deleteMultiple);
    // app.get('/galleries/:id', Galleries.show);
    // app.put('/galleries/:id', Galleries.update);

    app.get('/reviews', Reviews.index);
    // app.post('/reviews/:id', Reviews.create);
    app.delete('/reviews/:id', Reviews.delete);
    app.get('/reviews/:id', Reviews.show);
    app.put('/reviews/:id', Reviews.update);

    app.get('/venues', Venues.index);
    app.get('/venues/category/:category', Venues.category);
    app.post('/venues', Venues.create);
    app.put('/venues/upload/:id', Venues.upload);
    app.post('/venues/upload/multiple/:id', Venues.gallery);
    app.delete('/venues/:id', Venues.delete);
    app.get('/venues/:id', Venues.show);
    app.get('/venues/images/:id', Venues.images);
    app.put('/venues/:id', Venues.update);
    app.post("/reviews/:id", Venues.review);


    app.get('/venders', Venders.index);
    app.post('/venders', Venders.create);
    app.post('/venders/upload', Venders.upload);
    app.delete('/venders/:id', Venders.delete);
    app.get('/venders/:id', Venders.show);
    app.put('/venders/:id', Venders.update);

    app.all('*', (req, res, next) => {
        res.sendFile(path.resolve('./public/dist/index.html'));
    })
}
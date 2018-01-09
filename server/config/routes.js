const Users = require('../controllers/users');
const venues = require('../controllers/venues');
const ammenities = require('../controllers/ammenities');
const path = require('path');

module.exports = function (app) {
    app.post('/users', Users.create);
    app.post('/login', Users.authenticate);
    app.delete('/users', Users.logout);
    app.get('/session', Users.session);

    // VENUES
    app.get('/venues', venues.index);
    app.post('/venues/add', venues.upload);
    app.post('/venues/destroy', venues.destroy);
    app.post('/venues/update', venues.update);
    app.post('/venues/id', venues.getOne);

    // AMMENITIES
    app.get("/ammenities", ammenities.index);
    app.post("/ammenities/add", ammenities.upload);
    app.post("/ammenities/destroy", ammenities.destroy);
    app.post("/ammenities/update", ammenities.update);
    app.post("/ammenities/id", ammenities.getOne);

    // CATCH ALL
    app.all('*', (req, res, next) => {
        res.sendFile(path.resolve('./public/dist/index.html'));
    })
}

const Users = require('../controllers/users');
const venues = require('../controllers/venues');
const path = require('path');

module.exports = function (app) {
    app.post('/users', Users.create);
    app.post('/login', Users.authenticate);
    app.delete('/users', Users.logout);
    app.get('/session', Users.session);

    app.get('/venues', venues.index);
    app.post('/venues/add', venues.upload);
    app.post('/venues/destroy', venues.destroy);
    app.post('/venues/update', venues.update);
    app.post('/venues/id', venues.getOne);


    app.all('*', (req, res, next) => {
        res.sendFile(path.resolve('./public/dist/index.html'));
    })
}

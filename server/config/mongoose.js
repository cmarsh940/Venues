const mongoose = require('mongoose');
const fs = require('fs');
const database = 'tulsaVenues';

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://localhost/${database}`);

let models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach((file) => {
    if (file.includes('.js')) {
        console.log(`loading ${file}...`);
        require(`${models_path}/${file}`);
    }
});
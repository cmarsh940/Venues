const mongoose = require('mongoose');
const fs = require('fs');
const models_path = __dirname + '/../models';
const database = 'venue';

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://localhost/${database}`);

fs.readdirSync(models_path).forEach((file) => {
    console.log(`loading ${file}...`);
    require(`${models_path}/${file}`);
});
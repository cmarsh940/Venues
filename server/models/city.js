const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    n: {
        type: String,
        required: [true, 'Name cannot be blank.'],
        maxlength: 100,
        alias: 'name'
    },
}, { timestamps: true })

mongoose.model('City', CitySchema);
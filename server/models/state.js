const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
    n: {
        type: String,
        required: [true, 'Name cannot be blank.'],
        maxlength: 50,
        alias: 'name'
    }
}, { timestamps: true })

mongoose.model('State', StateSchema);
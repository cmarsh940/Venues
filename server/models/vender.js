const mongoose = require('mongoose');
const random = require('mongoose-random');

const VenderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be blank'],
        minlength: 1,
        maxlength: 250
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank'],
        minlength: 5,
        maxlength: 200
    },
    website: {
        type: String,
        required: [true, 'Website cannot be blank'],
        minlength: 6,
        maxlength: 250
    },
    phone: {
        type: String,
        required: [true, 'Phone number cannot be blank'],
        minlength: 10,
        maxlength: 11
    },
    address: {
        type: String,
        required: [true, 'Address cannot be blank'],
        minlength: 1,
        maxlength: 250
    },
    description: {
        type: String,
        required: [true, 'Description cannot be blank'],
        minlength: 1,
    },
    pic_url: {
        type: String,
        required: false
    }
}, { timestamps: true });

VenderSchema.plugin(random, { path: 'r' });

mongoose.model('Vender', VenderSchema);
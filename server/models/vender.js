const mongoose = require('mongoose');
const random = require('mongoose-random');

const VenderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be blank']
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank']
    },
    website: {
        type: String,
        required: [true, 'Website cannot be blank']
    },
    phone: {
        type: String,
        required: [true, 'Phone number cannot be blank']
    },
    address: {
        type: String,
        required: [true, 'Address cannot be blank']
    },
}, { timestamps: true });

VenderSchema.plugin(random, { path: 'r' });

mongoose.model('Vender', VenderSchema);
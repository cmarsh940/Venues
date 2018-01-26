const mongoose = require('mongoose');
const random = require('mongoose-random');

const VenueSchema = new mongoose.Schema({
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
        type: Number,
        required: [true, 'Phone number cannot be blank']
    },
    minAmmount: {
        type: Number,
        required: false
    },
    maxAmmount: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: [true, 'Address cannot be blank']
    }, 
    lat: {
        type: Number,
        required: false
    },
    lng: {
        type: Number,
        required: false
    },
    amenities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Amenity'
    }],
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, { timestamps: true });

VenueSchema.plugin(random, { path: 'r' });

mongoose.model('Venue', VenueSchema);
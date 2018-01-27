const mongoose = require('mongoose');
const random = require('mongoose-random');

const VenueSchema = new mongoose.Schema({
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
        type: Number,
        required: [true, 'Phone number cannot be blank, Example 123 123 1234'],
        minlength: 10,
        maxlength: 11
    },
    minAmmount: {
        type: Number,
        required: false,
        maxlength: 10
    },
    maxAmmount: {
        type: Number,
        required: false,
        maxlength: 15
    },
    address: {
        type: String,
        required: [true, 'Address cannot be blank'],
        maxlength: 250
    }, 
    lat: {
        type: Number,
        required: false,
        maxlength: 25
    },
    lng: {
        type: Number,
        required: false,
        maxlength: 25
    },
    description: {
        type: String,
        required: [true, 'Description cannot be blank'],
        minlength: 1,
    },
    pic_url: {
        type: String,
        required: false
    },
    amenities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Amenity'
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, { timestamps: true });

VenueSchema.plugin(random, { path: 'r' });

mongoose.model('Venue', VenueSchema);
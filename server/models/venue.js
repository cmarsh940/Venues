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
        type: String,
        required: [true, 'Phone number cannot be blank']
    },
    address: {
        type: String,
        required: [true, 'Address cannot be blank']
    },
    amenities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Amenity'
    }]
}, { timestamps: true });

VenueSchema.plugin(random, { path: 'r' });

mongoose.model('Venue', VenueSchema);
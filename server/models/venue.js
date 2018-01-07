const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
    n: {
        type: String,
        // required: [true, 'Name cannot be blank.'],
        maxlength: 250,
        alias: 'name'
    },
    e: {
        type: String,
        // required: [true, 'Email cannot be blank.'],
        alias: 'email'
    },
    p: {
        type: Number,
        // required: [true, "Phone number cannot be blank."],
        maxlength: 12,
        alias: 'phone'
    },
    w: {
        type: String,
        // required: [true, 'Website cannot be blank.'],
        alias: 'website'
    },
    cityName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city'
    },
    pic_url: {
        type: String,
        required: false
    } 
}, { timestamps: true })

mongoose.model('Venue', VenueSchema);
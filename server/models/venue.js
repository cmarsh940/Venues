const mongoose = require('mongoose');
const random = require('mongoose-random');

const VenueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be blank'],
        minlength: [5, "Email did not meat the requirments"],
        maxlength: [200, "Email cannot be greater then 200 characters"],
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank'],
        minlength: [5, "Email did not meat the requirments"],
        maxlength: [200, "Email cannot be greater then 200 characters"],
        trim: true,
        unique: true,
        validate: {
            validator: function (email) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: "Please enter your email in the correct format."
        }
    },
    website: {
        type: String,
        required: [true, 'Website cannot be blank'],
        minlength: [5, "Email did not meat the requirments"],
        maxlength: [200, "Email cannot be greater then 200 characters"],
        trim: true,

    },
    phone: {
        type: Number,
        required: [true, 'Phone number cannot be blank, Example 123 123 1234'],
        minlength: [9, "Phone number cannot be less then 9 characters"],
        maxlength: [11, "cannot be greater then 11 characters"],
        trim: true,
    },
    minAmmount: {
        type: Number,
        required: false,
        maxlength: [15, "cannot be greater then 15 characters"],
        trim: true,
    },
    maxAmmount: {
        type: Number,
        required: false,
        maxlength: [15, "cannot be greater then 15 characters"],
        trim: true,
    },
    address: {
        type: String,
        required: [true, 'Address cannot be blank'],
        maxlength: [500, "cannot be greater then 500 characters"]
    }, 
    lat: {
        type: Number,
        required: [true, "Latitude cannot be blank"],
        maxlength: [25, "cannot be greater then 25 characters"],
        trim: true,
    },
    lng: {
        type: Number,
        required: [true, "Longitude cannot be blank"],
        maxlength: [25, "cannot be greater then 25 characters"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description cannot be blank'],
    },
    pic_url: {
        type: String,
        required: false,
        trim: true,
    },
    tour_url: {
        type: String,
        required: false,
        trim: true,
    },
    video_url: {
        type: String,
        required: false,
        trim: true,
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
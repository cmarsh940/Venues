const mongoose = require('mongoose');
const random = require('mongoose-random');

const VenderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be blank'],
        maxlength: [250, "Name cannot be greater then 200 characters"]
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
        minlength: [5, "Website cannot be less then 5 characters"],
        maxlength: [250, "Website cannot be greater then 250 characters"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number cannot be blank'],
        minlength: [9, "Phone number cannot be less then 9 characters"],
        maxlength: [11, "Phone number cannot be greater then 11 characters"],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Address cannot be blank'],
        maxlength: [500, "Address cannot be greater then 500 characters"]
    },
    description: {
        type: String,
        required: [true, 'Description cannot be blank'],
    },
    pic_url: {
        type: String,
        required: false
    }
}, { timestamps: true });

VenderSchema.plugin(random, { path: 'r' });

mongoose.model('Vender', VenderSchema);
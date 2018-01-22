const mongoose = require('mongoose');

const VenderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name cannot be blank.'],
            maxlength: 250,
        },
        email: {
            type: String,
            required: [true, 'Email cannot be blank.'],
        },
        phone: {
            type: Number,
            required: [true, "Phone number cannot be blank."],
            maxlength: 12,
        },
        website: {
            type: String,
            required: [true, 'Website cannot be blank.'],
        },
        static_pic_url: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

mongoose.model('Vender', VenderSchema);
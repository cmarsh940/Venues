const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Title cannot be blank'],
        maxlength: 150,
        minlength: 1
    },
    content: {
        type: String,
        required: [true, 'Content cannot be blank'],
        maxlength: 350,
        minlength: 1
    },
    rating: {
        type: Number,
        required: [true, 'Rating cannot be blank'],
        maxlength: 5,
        minlength: 1
    },
    approved: {
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true });

mongoose.model('Review', ReviewSchema);
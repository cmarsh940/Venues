const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    fileName: { 
        type: String, 
        required: [true,"File name cannot be blank"], 
    },
    _venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue'
    }
});

mongoose.model('Gallery', GallerySchema); 
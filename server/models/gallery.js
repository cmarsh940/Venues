const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    fileName: { 
        type: String, 
        required: [true,"File name cannot be blank"], 
        default: '' },
    filePath: { 
        type: String, 
        required: [true,"File path cannot be blank"], 
        default: '' },
    isDeleted: { 
        type: Boolean, 
        required: true, 
        default: false },
    size: { 
        type: String, 
        required: [true,"Size cannot be blank"], 
        default: '' },
    mimeType: { 
        type: String, 
        required: [true,"mimeType cannot be blank"], 
        default: '' },
    _venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue'
    }
});

mongoose.model('Gallery', GallerySchema); 
const mongoose = require('mongoose');

const VendorCategorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true,"File name cannot be blank"], 
    },
});

mongoose.model('VendorCategory', VendorCategorySchema); 
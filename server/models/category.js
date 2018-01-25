const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be blank']
    }
}, { timestamps: true });

mongoose.model('Category', CategorySchema);
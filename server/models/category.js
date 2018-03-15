const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be blank']
    },
    venues: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue"
    }],
}, { timestamps: true });

mongoose.model('Category', CategorySchema);
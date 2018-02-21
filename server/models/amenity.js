const mongoose = require('mongoose');

const AmenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name cannot be blank"]
    },
  },
  { timestamps: true }
);

mongoose.model('Amenity', AmenitySchema);
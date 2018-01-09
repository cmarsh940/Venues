const mongoose = require('mongoose');

const AmmenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
  },
  { timestamps: true }
);

mongoose.model('Ammenity', AmmenitySchema);
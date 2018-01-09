const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema(
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
    address: {
      type: String,
      required: [true, 'Website cannot be blank.'],
    },
    website: {
      type: String,
      required: [true, 'Website cannot be blank.'],
    },
    pic_url: {
      type: String,
      required: false
    },
    ammenities: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ammenity"
    }
  },
  { timestamps: true }
);

mongoose.model('Venue', VenueSchema);
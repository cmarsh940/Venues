const mongoose = require('mongoose');
const random = require('mongoose-random');

const VenderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name cannot be blank"],
      maxlength: [250, "Name cannot be greater then 200 characters"]
    },
    email: {
      type: String,
      required: [true, "Email cannot be blank"],
      minlength: [5, "Email did not meat the requirments"],
      maxlength: [200, "Email cannot be greater then 200 characters"],
      trim: true,
      unique: true,
      validate: {
        validator: function(email) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
        },
        message: "Please enter your email in the correct format."
      }
    },
    website: {
      type: String,
      required: [true, "Website cannot be blank"],
      minlength: [5, "Website cannot be less then 5 characters"],
      maxlength: [250, "Website cannot be greater then 250 characters"],
      trim: true
    },
    phone: {
      type: String,
      required: [true, "Phone number cannot be blank"],
      minlength: [9, "Phone number cannot be less then 9 characters"],
      maxlength: [15, "Phone number cannot be greater then 15 characters"],
      trim: true
    },
    address: {
      type: String,
      required: [true, "Address cannot be blank"],
      maxlength: [500, "Address cannot be greater then 500 characters"]
    },
    city: {
      type: String,
      required: [true, "City cannot be blank"],
      maxlength: [150, "City cannot be greater then 150 characters"]
    },
    state: {
      type: String,
      required: [true, "State cannot be blank"],
      maxlength: [3, "State cannot be greater then 3 characters"]
    },
    description: {
      type: String,
      required: [true, "Description cannot be blank"]
    },
    facebook_url: {
      type: String,
      required: false,
      validate: {
        validator: function(text) {
          return text.indexOf("https://www.facebook.com/") === 0;
        },
        message: "Facebook must start with https://www.facebook.com/"
      }
    },
    instagram_url: {
      type: String,
      required: false,
      validate: {
        validator: function(text) {
          return text.indexOf("https://www.instagram.com/") === 0;
        },
        message: "Instagram must start with https://www.instagram.com/"
      }
    },
    pic_url: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

VenderSchema.plugin(random, { path: 'r' });

mongoose.model('Vender', VenderSchema);
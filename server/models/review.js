const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "You can only leave 1 review"],
        required: [true, 'Title cannot be blank'],
        minlength: [5, "Email did not meat the requirments"],
        maxlength: [200, "Email cannot be greater then 200 characters"],
        trim: true,
        validate: {
            validator: function (email) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: "Please enter your email in the correct format."
        }
    },
    content: {
        type: String,
        required: [true, 'Review cannot be blank'],
        maxlength: [350, "Review cannot be greater then 350 characters"]
    },
    rating: {
        type: Number,
        required: [true, 'Rating cannot be blank'],
        maxlength: [2, "Rating cannot be greater then 2 characters"]
    },
    approved: {
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true });


Model.on('index', function (err) { // <-- Wait for model's indexes to finish
    assert.ifError(err);
    Model.create([{ email: 'Val' }, { email: 'Val' }], function (err) {
        console.log(err);
    });
});

// Promise based alternative. `init()` returns a promise that resolves
// when the indexes have finished building successfully. The `init()`
// function is idempotent, so don't worry about triggering an index rebuild.
Model.init().then(function () {
    assert.ifError(err);
    Model.create([{ email: 'Val' }, { email: 'Val' }], function (err) {
        console.log(err);
    });
});

mongoose.model('Review', ReviewSchema);
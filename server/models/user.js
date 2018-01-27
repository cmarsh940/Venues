const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be blank'],
        minlength: 1,
        maxlength: 250
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank'],
        minlength: 5,
        maxlength: 200
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank and must be atleast 8 characters'],
        minlength: 8,
        maxlength: 200
    }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
    }
    next();
});

UserSchema.methods.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password);
}

mongoose.model('User', UserSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
}, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

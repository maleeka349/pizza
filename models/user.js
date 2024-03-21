const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subjects: {
        type: [String],
        required: true,
    },
    _id: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
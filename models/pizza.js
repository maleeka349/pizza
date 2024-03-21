const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    }
});

const Pizza = mongoose.model('Pizza', pizzaSchema);
module.exports = Pizza;
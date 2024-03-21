const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    items: {
        type: [String],
        required: true,
    },
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
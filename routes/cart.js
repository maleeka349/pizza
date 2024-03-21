var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/cart.js');

router.post('/addToCart', async function (req, res) {
    try {
        var cart = await Cart.find({ uid: req.body.uid });
        if (cart.length === 0) {
            cart = new Cart(req.body);
            await cart.save();
            res.status(201).json(cart);
        } else {
            cart = await Cart.findOneAndUpdate({
                uid: req.body.uid
            },
                {
                    $push: {
                        items: req.body.items
                    }
                },
                {
                    new: true
                });
            res.status(201).json(cart);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.put('/removeFromCart', async function (req, res) {
    try {
        const items = req.body.items;
        const uid = req.body.uid;
        console.log(items);
        console.log(uid);
        const response = await Cart.findOneAndUpdate(
            {
                uid: uid
            },
            {
                $pull: {
                    items: items
                }
            },
            {
                new: true
            });
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.delete('/deleteCart/:id', async function (req, res) {
    try {
        const id = req.params.id;
        console.log(id);
        const response = await Cart.findOneAndDelete({ uid: id });
        res.json({ message: "Cart deleted successfully." });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

module.exports = router;

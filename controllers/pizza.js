const Pizza = require('../models/pizza');
const mongoose = require('mongoose');

const addPizza = async (req, res) => {
    try {
        const pizza = new Pizza(req.body);
        await pizza.save();
        res.status(201).json(pizza);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find();
        res.status(200).json(pizzas);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const updatePizza = async (req, res) => {
    try {
        const id = req.params.id;
        const pizza = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No pizza with id: ${id}`);
        const newPizza = await Pizza.findByIdAndUpdate(
            { _id: id },
            { $set: pizza },
            { new: true },
        );
        res.status(200).json(newPizza);
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const deletePizza = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No pizza with id: ${id}`);
        }

        await Pizza.findByIdAndRemove(id);
        res.json({ message: "Pizza deleted successfully." });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

module.exports = { addPizza, getAllPizzas, updatePizza, deletePizza };
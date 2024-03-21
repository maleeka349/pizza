var express = require('express');
var pizzaCtrl = require('../controllers/pizza');

var router = express.Router();

router.post('/addPizza', async function (req, res) {
    await pizzaCtrl.addPizza(req, res);
});

router.get('/pizzas', async function (req, res) {
    await pizzaCtrl.getAllPizzas(req, res);
});

router.put('/updatePizza/:id', async function (req, res) {
    await pizzaCtrl.updatePizza(req, res);
})

router.delete('/pizza/:id', async function (req, res) {
    await pizzaCtrl.deletePizza(req, res);
})

module.exports = router;
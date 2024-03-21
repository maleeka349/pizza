var express = require('express');
var router = express.Router();

const data = {
    '0': 'Ahmad',
    '1': 'Ali',
    '2': 'Usama',
    '3': 'Hamza',
    '4': 'Hasher',
}

router.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const users = data[id];
    res.json({
        'name': users,
    });
});

router.post('/addUser', (req, res) => {
    const originalData = req.body;
    console.log(originalData);
    data[originalData.id] = originalData.name;

    res.status(200).json(data);
});

router.put('/updateUser/:id/:name', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    console.log(name);
    data[id] = name;

    res.status(200).json(data);
})

router.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    delete data[id];

    res.status(200).json(data);
});

module.exports = router;
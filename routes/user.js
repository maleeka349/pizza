var express = require('express');
var userCtrl = require('../controllers/user');

var router = express.Router();

router.post('/addUser', async function (req, res) {
    await userCtrl.addUser(req, res);
});

router.get('/getUser/:id', async function (req, res) {
    await userCtrl.getUser(req, res);
})

router.put('/addSubject/:id', async function (req, res) {
    await userCtrl.addSubject(req, res);
});

router.put('/updateUser/:id', async function (req, res) {
    await userCtrl.updateUser(req, res);
})

router.delete('/deleteUser/:id', async function (req, res) {
    await userCtrl.deleteUser(req, res);
})

router.get('/getAllUser', async function (req, res) {
    await userCtrl.getAllUsers(req, res);
});

router.put('/addSubjects/:id', async function (req, res) {
    await userCtrl.addMultipleSubjects(req, res);
});

module.exports = router;
const User = require('../models/user');
const mongoose = require('mongoose');

const addUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const users = await User.find({ _id: id });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, subjects } = req.body;
    console.log(name);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    const updatedUser = { name, subjects, _id: id };
    await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(updatedUser);
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully." });
}

const addSubject = async (req, res) => {
    const id = req.params.id;
    const subject = req.body.subject;
    const userUpdated = await User.findByIdAndUpdate(
        { _id: id },
        { $push: { subjects: subject } },
        { new: true },
    );
    res.status(200).json(userUpdated);
}

const deleteSubject = async (req, res) => {
    const id = req.params.id;
    const subject = req.body.subject;
    User.findByIdAndUpdate(
        { _id: id },
        { $pull: { subjects: subject } },
    );
    res.status(200);
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const addMultipleSubjects = async (req, res) => {
    try {
        const id = req.params.id;
        const subjects = req.body.subjects;
        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            { $push: { $each: { subjects: subjects } } },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getCustom = async (req, res) => {
    try {
        const users = User.find(
            {
                $and: [
                    { subjects: { $in: ['Maths', 'English'] } },
                    { $gt: { age: 18 } },
                    { $lt: { age: 60 } },
                ],
            }, {
            $sort: { age: 1 },
        }
        )

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = { addUser, getUser, updateUser, deleteUser, addSubject, deleteSubject, getAllUsers, addMultipleSubjects };
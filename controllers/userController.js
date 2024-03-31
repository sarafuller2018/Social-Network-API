// importing files
const { User, Thought } = require("../models");

// get all users
async function getUsers(req, res) {
    try {
        const users = await User.find()
        .select("-__v");
        res.json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// get one user
async function getUserById(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .select("-__v");

        if (!user) {
            return res.status(404).json({ message: "No user found with that ID!" })
        }
        res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// create new user
async function createUser(req, res) {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// update a user
async function updateUser(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "No user found with that ID!" })
        }

        res.status(200).json(user);
        console.log(`Updated: ${user}`);
    } catch (err) {
        res.status(500).json(err);
    }
};

// delete user
async function deleteUser(req, res) {
    try {
        const user = await User.findOneAndRemove({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: "No user found with that ID!" })
        }
        res.status(200).json({ message: 'User successfully deleted' });
        console.log(`User deleted.`);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// add friend to user friend list
async function addFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.ObjectId } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "No user found with that ID!" })
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// remove friend from user friend list
async function removeFriend(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "No user found with that ID!" })
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// exports for use
module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend }
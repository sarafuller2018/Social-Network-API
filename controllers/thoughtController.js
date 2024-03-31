// importing files
const { User, Thought } = require("../models");

// get all thoughts
async function getThoughts(req, res) {
    try {
        const thoughts = await Thought.find()
        res.json(thoughts);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// get one thought
async function getThoughtById(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v");

        if (!thought) {
            return res.status(404).json({ message: "No thought found with that ID!" })
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// create new thought
async function createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findByIdAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'Thought created, but no user found with that ID' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// update a thought
async function updateThought(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(thought);
        console.log(`Updated: ${thought}`);
    } catch (err) {
        res.status(500).json(err);
    }
};

// delete thought
async function deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: "No thought found with that ID!" })
        }
        res.status(200).json({ message: 'Thought successfully deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// add reaction to a thought
async function addReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: "No thought found with that ID!" })
        }

        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// delete reaction to a thought
async function removeReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: "No thought found with that ID!" })
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// exports for use
module.exports = { getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction }
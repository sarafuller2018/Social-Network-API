// imports express router and functions from controllers
const router = require("express").Router();
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require("../../controllers/thoughtController");

// gets all thoughts and creates a thought
router.route("/").get(getThoughts).post(createThought);

// get thought by id and delete thought and update thought
router.route("/:thoughtId").get(getThoughtById).delete(deleteThought).put(updateThought);

// add or remove reactions
router.route("/:userId/thoughts").post(addReaction);
router.route("/:userId/thoughts/thoughtId").delete(removeReaction);

// exports for use
module.exports = router;
// imports express router and functions from controllers
const router = require("express").Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require("../../controllers/userController");

// gets all users and creates a user
router.route("/").get(getUsers).post(createUser);

// get user by id and delete user and update user
router.route("/:userId").get(getUserById).delete(deleteUser).put(updateUser);

// add or remove friends
router.route("/:userId/friends").post(addFriend);
router.route("/:userId/friends/friendId").delete(removeFriend);

// exports for use
module.exports = router;
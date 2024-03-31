// importing mongoose
const { Schema, model } = require("mongoose");

// creating schema for users
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid email address."]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thoughts",
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            }
        ]
    },
    // includes virtuals (overrides default behavior)
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// creates a model called user using the userSchema
const User = model("user", userSchema);

// exporting for use
module.exports = User;
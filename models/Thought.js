// importing mongoose and necessary files
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// creating schema for users
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    // includes getters
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

// creates a model called thought using the thoughtSchema
const Thought = model("thought", thoughtSchema);

// exports for use
module.exports = Thought;
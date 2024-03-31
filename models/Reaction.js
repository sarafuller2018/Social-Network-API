// importing mongoose
const { Schema, Types } = require("mongoose");

// creating schema for users
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        }
    },
    // includes getters
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

// getter method to format time 
???


// exports for use
module.exports = reactionSchema;
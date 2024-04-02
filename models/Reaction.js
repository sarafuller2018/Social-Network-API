// importing mongoose and dayjs
const { Schema, Types } = require("mongoose");
const dayjs = require('dayjs');

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
            default: Date.now,
            get: function formatTime(createdAt) {
                return dayjs(createdAt).format("MMM D, YYYY h:mm A")
            },
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

// exports for use
module.exports = reactionSchema;
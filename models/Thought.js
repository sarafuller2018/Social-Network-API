// importing mongoose and necessary files
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dayjs = require('dayjs');
const { format } = require("path");

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
            get: formatTime()
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
     // includes virtuals (overrides default behavior)
     {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
    // includes getters
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

function formatTime() {
return dayjs().format("lll")
}

// virtual brings back number of reactions
thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

// creates a model called thought using the thoughtSchema
const Thought = model("thought", thoughtSchema);

// exports for use
module.exports = Thought;
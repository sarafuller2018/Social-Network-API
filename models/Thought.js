// importing mongoose and necessary files
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dayjs = require('dayjs');

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
      default: Date.now,
      get: function formatTime(createdAt) {
        return dayjs(createdAt).format("MMM D, YYYY h:mm A")
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  // includes virtuals and getters (overrides default behavior)
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);

// virtual brings back number of reactions
thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

// creates a model called thought using the thoughtSchema
const Thought = model("thought", thoughtSchema);

// exports for use
module.exports = Thought;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  upVotes: {
    type: Number,
    default: 0,
  },
  downVotes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Idea", IdeaSchema);

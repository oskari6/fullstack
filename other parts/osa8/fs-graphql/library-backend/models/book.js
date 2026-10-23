const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  published: {
    type: Number,
  },
  genres: {
    type: [String],
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("Book", schema);

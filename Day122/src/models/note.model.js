const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  content: String,
});

const noteModel = mongoose.model('note', noteSchema);

module.exports = noteModel;
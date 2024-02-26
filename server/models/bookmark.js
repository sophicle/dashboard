const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  name: String, // name of the bookmark
  link: String, // url or file path
  type: String, // url, file
  folder: String, // folder name
  userId: String, // id of the user who created the bookmark
});

// compile model from schema
module.exports = mongoose.model("bookmark", BookmarkSchema);

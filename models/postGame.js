var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GameSchema = new Schema({
    title: String,
    description: String,
    release_date: String,
    developer: String,
    publisher: String,
    image: String,
    tags: [String]
});

module.exports = mongoose.model("Game", GameSchema);
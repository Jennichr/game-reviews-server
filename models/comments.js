var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var { ObjectId } = Schema.Types;

var CommentSchema = new Schema({
    gameId: String,
    text: String,
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Comment", CommentSchema);
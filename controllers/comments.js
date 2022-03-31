var CommentModel = require('../models/comments');

const getComment = async (req, res) => {
    CommentModel.find()
    .populate('postedBy', '_id username')
    .then(posts => {
        res.json({ posts })
    })
    .catch(err => {
        console.log(err)
    })
};

const getCommentByGameId = async (req, res) => {
    const { id } = req.params;
    CommentModel.findOne({ gameId: id })
    .populate('postedBy', '_id username')
    .then(posts => {
        res.json({ posts })
    })
    .catch(err => {
        console.log(err)
    })
};
module.exports = { getComment, getCommentByGameId };
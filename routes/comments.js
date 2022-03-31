var express = require('express');
var { getComment, getCommentByGameId } = require('../controllers/comments');
var requiredLogin = require('../middleware/requiredLogin');
var CommentModel = require('../models/comments');
var router = express.Router();

router.get('/', getComment); // get all comment
router.get('/:id', getCommentByGameId); // get all comment by game id

// get comment posted by user
router.get('/mycomment', requiredLogin, (req, res) => {
    CommentModel.find({ postedBy: req.user._id })
    .populate('postedBy', '_id username')
    .then(mypost => {
        res.json({ mypost })
    })
    .catch(err => {
        console.log(err)
    })
});
router.post('/createcomment', requiredLogin, (req, res) => {
    const { gameId, text } = req.body
    if (!text) {
        return res.status(422).json({ error: 'Please fill in the field' })
    }
    // console.log(req.user)
    req.user.password = undefined
    const newComment = new CommentModel ({
        gameId,
        text,
        postedBy: req.user
    })
    newComment.save().then((result) => {
        res.json({ newComment: result })
    })
    .catch((err) => {
        console.log(err)
    })
});

module.exports = router;
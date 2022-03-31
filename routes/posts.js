var express = require('express');
var { getPost, createPost, getPostById } = require('../controllers/posts')
var router = express.Router();

// localhost:3000/posts
router.get('/', getPost);
router.get('/:id', getPostById);
router.post('/', createPost);

module.exports = router;
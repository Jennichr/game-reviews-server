var express = require('express');
var { getUser, signUp, signIn } = require('../controllers/user');
var requiredLogin = require('../middleware/requiredLogin')
var router = express.Router();

router.get('/', getUser);
router.get('/protected', requiredLogin, (req, res) => {
    res.send('hello usesr')
});
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
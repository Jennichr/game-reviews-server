var jwt = require('jsonwebtoken');
var userModel = require('../models/user'); 

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    // authorization == Bearer jhkahsflkjaf
    if (!authorization) {
        return res.status(401).json({ error: 'you are not authorized' })
    }
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: 'you are not authorized' })
        }

        const { _id } = payload;
        userModel.findById(_id).then((userData) => {
            req.user = userData
            next()
        })
    })
}
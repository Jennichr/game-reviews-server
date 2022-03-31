var userModel = require('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
    try {
        const user = await userModel.find();
        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const signUp = async (req, res) => {
    const { email, username, password } = req.body;
    // Check whether all required fields is filled in
    if (!email || !username || !password) {
        return res.status(422).json({ error: 'please fill in all required fields' })
    }
    // res.json({ message: 'successfully added to db' })
    userModel.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: 'another account is already registered with the email address' })
            }
            bcrypt.hash(password, 12)
                .then((hashedPassword) => {
                    const newUser = new userModel({
                        email,
                        username,
                        password: hashedPassword
                    });

                    newUser.save()
                        .then(user => {
                            res.json({ message: 'successfully signed up' })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
        }).catch(err => {
            console.log(err)
        })
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: 'please fill in all required fields' })
    }
    userModel.findOne({ email: email })
    .then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: 'Invalid email or password' })
        }
        bcrypt.compare(password, savedUser.password)
        .then((doMatch) => {
            if (doMatch) {
                // res.json({ message: 'successfully signed in' })
                const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET)
                const { _id, username, email } = savedUser
                res.json({ token, user: { _id, username, email } })
            }
            else {
                return res.status(422).json({ error: 'Invalid email or password' })
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
};

module.exports = { getUser, signUp, signIn };
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = 'secrettoken';

router.post('/', function (req, res) {
    let data = req.body; // { username: 'nana', password: '12234'}
    console.log(data);
    User
        .findOne(
            {
                userName: data.userName,
                password: data.password
            }
        )
        .then(user => {
            if(user){
                let user2 = user.toJSON();
                let toSign = { userName: user2.userName, mail: user2.mail};
                console.log(toSign);
                console.log(user2);
                let token = jwt.sign(toSign, secret);
                res.status(200).json({
                    token: token,                       
                    name: user2.name,
                    lastName: user2.lastName,
                    userName: user2.userName,
                    mail: user2.mail,
                    tweets: user2.tweets,
                    followers: user2.followers,
                    following: user2.following
                });
            } else {
                res.status(401).json({ message: 'Credenciales invalidas'});
            }
        })
});

router.post('/signup', function (req, res) {
    let data = req.body;
    User.findOne({ userName: data.userName })
    .then(result => {
        if (result) {
            return res.status(422).json({
                message: "Username already exists."
            })
        } else {
            user = new User({
                name: data.name,
                lastName: data.lastName,
                userName: data.userName,
                password: data.password,
                mail: data.mail,
                tweets: 0,
                followers: 0,
                following: 0
            })
            user.save()
                .then(result => {
                    res.status(200).json({
                        message: 'User created!',
                        newUser: {
                            name: result.name,
                            lastName: result.lastName,
                            userName: result.userName,
                            password: result.password,
                            mail: result.mail,
                            tweets: 0,
                            followers: 0,
                            following: 0
                        }
                    })
                })
                .catch(err => {
                    res.status(500).json({ message: "Could not create new user" })
                })
        }
    });
})

module.exports = router;
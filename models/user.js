const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    userName: { type: String, required: true },
    password: { type: String, required: true },
    mail: { type: String, required: true },
    tweets: Number,
    followers: Number,
    following: Number
});

module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
    description: String,
    createdOn: { type: Date, default: Date.now },
    owner: {
        name: String,
        lastName: String,
        userName: String        
    }
});

module.exports = mongoose.model('Tweet', tweetSchema)
const express = require('express');
const router = express.Router();

const Tweet = require('../models/tweet');

//const tasksRouter = require('./tasks');

/*router.use('/:listId/tasks', (req, res, next) => {
  req.listId = req.params.listId
  next()
} , tasksRouter)*/

//TODOS LOS TWEETS.
router.get('/', (req, res) => {
  Tweet.find().then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

//BUSQUEDA DE TWEET PARTICULAR.
router.get('/:tweetId', (req, res) => {
  Tweet.findById(req.params.tweetId).then(result => {
    result ? res.status(200).json(result) : res.status(404).json(err)
  })
  .catch(err => {
    res.status(500).json({
      message: "Tweet not found"
    })
  });
});

//NUEVO TWEET.
router.post('/', (req, res) => {
  const tweet = new Tweet({
    description: req.body.description,
    owner: req.body.owner
  });

  tweet.save()
  .then(result => {
    res.status(201).json({
      message: 'Tweet added',
      tweet: result
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  });
});

//BORRAR TWEET PARTICULAR.
router.delete('/:tweetId', (req, res) => {
  Tweet.findByIdAndDelete(req.params.tweetId)
  .then(result => {
    res.status(200).json({
      message: "Tweet was deleted succesfully"
    })
  })
  .catch(err => {
    res.status(404).json({
      message: "Tweet was not found",
      error: err
    })
  })
})

module.exports = router;

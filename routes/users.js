var express = require('express');
var router = express.Router();

const User = require('../models/user');

//TODOS LOS USUARIOS.
router.get('/', (req, res) => {
  User.find().then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

//USUARIO NUEVO.
router.post('/', (req, res) => {
  const user = new User ({
      name: req.body.name,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      mail: req.body.mail,
      tweets: 0,
      followers: 0,
      following: 0
  });

  user.save()
  .then(result => {
    res.status(201).json({
      message: 'User added',
      user: result
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  });
});

//BUSQUEDA DE USER PARTICULAR.
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId).then(result => {
    result ? res.status(200).json(result) : res.status(404).json(err)
  })
  .catch(err => {
    res.status(500).json({
      message: "User not found"
    })
  });
});

//BORRAR USER PARTICULAR.
router.delete('/:userId', (req, res) => {
  User.findByIdAndDelete(req.params.userId)
  .then(result => {
    res.status(200).json({
      message: "User was deleted succesfully"
    })
  })
  .catch(err => {
    res.status(404).json({
      message: "Tweet was not found",
      error: err
    })
  })
});

module.exports = router;

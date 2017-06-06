const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

console.log('In register scope');

router.get('/check', function(req, res, next){
  if(req.signedCookies.username){
    res.send({loggedIn: true});
  }else{
    res.send({loggedIn: false});
  }
})

router.post('/', function(req, res, next){
  var username = req.body.name.toLowerCase();
  knex.raw('INSERT into users (id, username, money) values (DEFAULT, ?, 500)', [username])
  .then(function(){
    res.cookie('username', username, {signed: true});
    res.send('working');
  })
})

module.exports = router;

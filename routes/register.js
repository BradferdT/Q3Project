const express = require('express');
const router = express.Router();
const knex = require('../db/knex');


router.get('/check', function(req, res, next){
  if(req.signedCookies.username){
    knex.raw('SELECT * FROM users WHERE username = ?', [req.signedCookies.username])
    .then(function(data){
      var resObj = {loggedIn: true, moneyLeft: data.rows[0].money, username: data.rows[0].username};
      res.send(resObj);
    })
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

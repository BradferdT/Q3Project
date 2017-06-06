const express = require('express');
const router = express.Router();
const knex = require('../db/knex');



router.post('/bet', function(req, res, next){
  if(req.signedCookies.username && req.body.betAmount){
    var username = req.signedCookies.username;
    var bet = req.body.betAmount;
    knex.raw('UPDATE users SET money = (money - ?) WHERE username = ?', [bet, username])
    .then(function(){
      knex.raw('SELECT * FROM users WHERE username = ?', [username])
      .then(function(data){
        resObj = {success: true, moneyLeft: data.rows[0].money};
        res.send(resObj);
      })
    })
  }else{
    res.send('Error');
  }
})

module.exports = router;

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

var deck = [];

router.post('/bet', function(req, res, next){
  if(req.signedCookies.username && req.body.betAmount){
    var username = req.signedCookies.username;
    var bet = req.body.betAmount;
    if(deck.length < 20){
      deck = buildDeck(cards, 6);
    }
    knex.raw('UPDATE users SET money = (money - ?) WHERE username = ?', [bet, username])
    .then(function(){
      knex.raw('SELECT * FROM users WHERE username = ?', [username])
      .then(function(data){
        var c1,c2,c3,c4
        c1 = deck.pop();
        c2 = deck.pop();
        c3 = deck.pop();
        c4 = deck.pop();
        res.send({c1: c1, c2: c2, c3: c3, c4: c4, moneyLeft: data.rows[0].money});
      })
    })

    }
});


router.get('/hit', function(req, res, next){
  if(req.signedCookies.username){
    var deck = buildDeck(cards, 1);
    var newCard = deck.pop();
    res.send({newCard: newCard})
  }
})

router.get('/stand', function(req, res, next){
  if(req.signedCookies.username){
    var deck = buildDeck(cards, 1);
    var c1,c2,c3,c4,c5,c6;
    c1 = deck.pop();
    c2 = deck.pop();
    c3 = deck.pop();
    c4 = deck.pop();
    c5 = deck.pop();
    c6 = deck.pop();
    res.send([c1,c2,c3,c4,c5,c6])
  }
})

router.post('/win', function(req, res, next){
  if(req.signedCookies.username){
    var username = req.signedCookies.username;
    var dollarsWon = req.body.amount;
    knex.raw('UPDATE users SET money = (money + ?), wins = (wins + 1) WHERE username = ?', [dollarsWon, username])
    .then(function(){
      res.send('Complete')
    })
  }
})

router.post('/tie', function(req, res, next){
  if(req.signedCookies.username){
    var username = req.signedCookies.username;
    var bet = req.body.bet;
    knex.raw('UPDATE users SET money = (money + ?), ties = (ties + 1) WHERE username = ?', [bet, username])
    .then(function(){
      res.send('Complete')
    })
  }
})

router.put('/loss', function(req, res, next){
  if(req.signedCookies.username){
    var username = req.signedCookies.username;
    knex.raw('UPDATE users SET losses = (losses + 1) WHERE username = ?', [username])
    .then(function(){
      res.send('Complete')
    })
  }
})

router.delete('/delete', function(req, res, next){
  if(req.signedCookies.username){
    var username = req.signedCookies.username;
    knex.raw('DELETE FROM users WHERE username = ?', [username])
    .then(function(){
      res.clearCookie('username');
      res.send('complete');
    })
  }
})

router.delete('/quit', function(req, res, next){
  if(req.signedCookies.username){
    res.clearCookie('username');
    res.send('complete');
  }
})

router.get('/leaderboard', function(req, res, next){
  knex.raw('SELECT * FROM users ORDER BY money DESC LIMIT 3')
  .then(function(data){
    res.send(data.rows);
  })
})

router.get('/deck', function(req, res, next){
  if(deck.length > 0){
    res.send(deck);
  }else{
    deck = buildDeck(cards, 6);
    res.send(deck);
  }
})






function buildDeck(cards, decks){
  var builtDeck = [];
  for(var i = 0; i < decks; i++){
    var unshuffled = [];
    for(var x = 0; x < cards.length; x++){
      unshuffled.push(cards[x]);
    }
    for(var j = 0; j < cards.length; j++){
      var rand = Math.floor(Math.random() * unshuffled.length);
      var card = unshuffled.splice(rand,1);
      builtDeck.push(card[0]);
    }
  }
  return builtDeck;
}




const cards = [
  {suit: 'Clubs', name: 'Ace of Clubs', val: 11, img: 'images/ace_of_clubs.png'},
  {suit: 'Clubs', name: '2 of Clubs', val: 2, img: 'images/2_of_clubs.png'},
  {suit: 'Clubs', name: '3 of Clubs', val: 3, img: 'images/3_of_clubs.png'},
  {suit: 'Clubs', name: '4 of Clubs', val: 4, img: 'images/4_of_clubs.png'},
  {suit: 'Clubs', name: '5 of Clubs', val: 5, img: 'images/5_of_clubs.png'},
  {suit: 'Clubs', name: '6 of Clubs', val: 6, img: 'images/6_of_clubs.png'},
  {suit: 'Clubs', name: '7 of Clubs', val: 7, img: 'images/7_of_clubs.png'},
  {suit: 'Clubs', name: '8 of Clubs', val: 8, img: 'images/8_of_clubs.png'},
  {suit: 'Clubs', name: '9 of Clubs', val: 9, img: 'images/9_of_clubs.png'},
  {suit: 'Clubs', name: '10 of Clubs', val: 10, img: 'images/10_of_clubs.png'},
  {suit: 'Clubs', name: 'Jack of Clubs', val: 10, img: 'images/jack_of_clubs.png'},
  {suit: 'Clubs', name: 'Queen of Clubs', val: 10, img: 'images/queen_of_clubs.png'},
  {suit: 'Clubs', name: 'King of Clubs', val: 10, img: 'images/king_of_clubs.png'},
  {suit: 'Diamonds', name: 'Ace of Diamonds', val: 11, img: 'images/ace_of_diamonds.png'},
  {suit: 'Diamonds', name: '2 of Diamonds', val: 2, img: 'images/2_of_diamonds.png'},
  {suit: 'Diamonds', name: '3 of Diamonds', val: 3, img: 'images/3_of_diamonds.png'},
  {suit: 'Diamonds', name: '4 of Diamonds', val: 4, img: 'images/4_of_diamonds.png'},
  {suit: 'Diamonds', name: '5 of Diamonds', val: 5, img: 'images/5_of_diamonds.png'},
  {suit: 'Diamonds', name: '6 of Diamonds', val: 6, img: 'images/6_of_diamonds.png'},
  {suit: 'Diamonds', name: '7 of Diamonds', val: 7, img: 'images/7_of_diamonds.png'},
  {suit: 'Diamonds', name: '8 of Diamonds', val: 8, img: 'images/8_of_diamonds.png'},
  {suit: 'Diamonds', name: '9 of Diamonds', val: 9, img: 'images/9_of_diamonds.png'},
  {suit: 'Diamonds', name: '10 of Diamonds', val: 10, img: 'images/10_of_diamonds.png'},
  {suit: 'Diamonds', name: 'Jack of Diamonds', val: 10, img: 'images/jack_of_diamonds.png'},
  {suit: 'Diamonds', name: 'Queen of Diamonds', val: 10, img: 'images/queen_of_diamonds.png'},
  {suit: 'Diamonds', name: 'King of Diamonds', val: 10, img: 'images/king_of_diamonds.png'},
  {suit: 'Hearts', name: 'Ace of Hearts', val: 11, img: 'images/ace_of_hearts.png'},
  {suit: 'Hearts', name: '2 of Hearts', val: 2, img: 'images/2_of_hearts.png'},
  {suit: 'Hearts', name: '3 of Hearts', val: 3, img: 'images/3_of_hearts.png'},
  {suit: 'Hearts', name: '4 of Hearts', val: 4, img: 'images/4_of_hearts.png'},
  {suit: 'Hearts', name: '5 of Hearts', val: 5, img: 'images/5_of_hearts.png'},
  {suit: 'Hearts', name: '6 of Hearts', val: 6, img: 'images/6_of_hearts.png'},
  {suit: 'Hearts', name: '7 of Hearts', val: 7, img: 'images/7_of_hearts.png'},
  {suit: 'Hearts', name: '8 of Hearts', val: 8, img: 'images/8_of_hearts.png'},
  {suit: 'Hearts', name: '9 of Hearts', val: 9, img: 'images/9_of_hearts.png'},
  {suit: 'Hearts', name: '10 of Hearts', val: 10, img: 'images/10_of_hearts.png'},
  {suit: 'Hearts', name: 'Jack of Hearts', val: 10, img: 'images/jack_of_hearts.png'},
  {suit: 'Hearts', name: 'Queen of Hearts', val: 10, img: 'images/queen_of_hearts.png'},
  {suit: 'Hearts', name: 'King of Hearts', val: 10, img: 'images/king_of_hearts.png'},
  {suit: 'Spades', name: 'Ace of Spades', val: 11, img: 'images/ace_of_spades.png'},
  {suit: 'Spades', name: '2 of Spades', val: 2, img: 'images/2_of_spades.png'},
  {suit: 'Spades', name: '3 of Spades', val: 3, img: 'images/3_of_spades.png'},
  {suit: 'Spades', name: '4 of Spades', val: 4, img: 'images/4_of_spades.png'},
  {suit: 'Spades', name: '5 of Spades', val: 5, img: 'images/5_of_spades.png'},
  {suit: 'Spades', name: '6 of Spades', val: 6, img: 'images/6_of_spades.png'},
  {suit: 'Spades', name: '7 of Spades', val: 7, img: 'images/7_of_spades.png'},
  {suit: 'Spades', name: '8 of Spades', val: 8, img: 'images/8_of_spades.png'},
  {suit: 'Spades', name: '9 of Spades', val: 9, img: 'images/9_of_spades.png'},
  {suit: 'Spades', name: '10 of Spades', val: 10, img: 'images/10_of_spades.png'},
  {suit: 'Spades', name: 'Jack of Spades', val: 10, img: 'images/jack_of_spades.png'},
  {suit: 'Spades', name: 'Queen of Spades', val: 10, img: 'images/queen_of_spades.png'},
  {suit: 'Spades', name: 'King of Spades', val: 10, img: 'images/king_of_spades.png'}
]


module.exports = router;

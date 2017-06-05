const express = require('express');
const router = express.Router();
const knex = require('../db/knex');


router.get('/', function(req,res,next){
  console.log('Working');
  res.send('Working');
})

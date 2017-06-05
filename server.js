const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const knex = require('./db/knex');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser('erqweproijajlsfasdjjjj'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function(){
  console.log('Server is running on', port);
})
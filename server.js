const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}));

let db;

MongoClient.connect('mongodb://localhost:27017/nodetest1', (err, database) => {
  if(err) return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if(err) return console.log(err);
    console.log("saved to database");
    res.redirect('/');
  });
});

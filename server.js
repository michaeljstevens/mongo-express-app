const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let db;

MongoClient.connect('mongodb://localhost:27017/nodetest1', (err, database) => {
  if(err) return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
});

app.get('/', (req, res) => {
  const cursor = db.collection('quotes').find().toArray((err, results) => {
    if(err) return console.log(err);
    res.render('index.ejs', {quotes: results});
  });
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if(err) return console.log(err);
    console.log("saved to database");
    res.redirect('/');
  });
});

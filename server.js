const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log("listening on port 3000");
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/quotes', (req, res) => {
  console.log("hello");
});

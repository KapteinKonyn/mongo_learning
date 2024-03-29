const express = require('express');
const { connectToDb, getDb } = require('./db');

// init app & middleware
const app = express();

// db connection
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('App listening on port 3000');
    });
    db = getDb();
  }
});

// routes
app.get('/books', (req, res) => {
  let books = [];

  db.collection('books')
    .find()
    .sort({ author: 1 })
    .forEach((book) => {
      books.push(book);
    })
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: 'could not fetch docs' });
    }); //returns cursor to Array() forEach()
  // res.json({ msg: 'welcome to the api' });
});

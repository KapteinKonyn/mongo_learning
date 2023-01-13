const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect('mongodb://127.0.0.1:27017/bookstore')
      .then((client) => {
        dbConnection = client.db();
        return cb(); // this callback fires AFTER previous line
      })
      .catch((err) => {
        console.log(err);
        return cb(err); // this callback fires AFTER previous line
      });
  },
  getDb: () => dbConnection,
};

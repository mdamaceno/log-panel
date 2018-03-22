const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

const DATABASE_HOST = process.env.PANELLOGS_DATABASE_HOST || 'localhost';
const DATABASE_PORT = process.env.PANELLOGS_DATABASE_PORT || 27017;
const DATABASE_NAME = process.env.PANELLOGS_DATABASE_NAME;
const url = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/`;

let _db;

let getDB = function(db) {
  return db.db(DATABASE_NAME);
}

let connectDB = function(callback) {
  MongoClient.connect(url, function(err, db) {
    _db = getDB(db);
    return callback(err);
  });
}

let collection = function(name) {
  return new Promise((resolve, reject) => {
    connectDB(function(err) {
      if (err) {
        return reject(err);
      }

      if (typeof name != 'string') {
        return reject(new Error('Collection name must be a String'));
      }

      return _db.collection(name).find().toArray()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  });
}

module.exports = {
  collection
};

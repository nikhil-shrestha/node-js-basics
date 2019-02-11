const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://illusionist17:heaven-hunter17@cluster0-pdf2z.mongodb.net/shop?retryWrites=true"
  )
    .then(client => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if(_db){
    return _db;
  }

  return 'No database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

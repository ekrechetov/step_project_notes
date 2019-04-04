const {uri, dbName, colName} = require('../db/config.js');
const MongoClient = require('mongodb').MongoClient;

module.exports = async () => {
  let connection;
  try {
    connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    console.log("Check DB connection: Ok")
    connection.close();
    return true;
  } catch(e) {
    return false;
  }
};
const {uri, dbName, colName} = require('../db/config.js');
const MongoClient = require('mongodb').MongoClient;

module.exports = (app) => {
  app.get('/', async function (req, res) {
    let connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    const notesDb = connection.db(dbName);
    const notesCol = notesDb.collection(colName);
    const notes = await notesCol.find({}).toArray();
    connection.close();
    res.render('index', {notes: notes});    
  });
}
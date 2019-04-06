const {uri, dbName, colName} = require('../db/config.js');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

module.exports = (app) => {
  app.put('/notes/:id', async function (req, res) {
    let connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    console.log('Connected for update: Ok');
    const id = new ObjectID(req.body.id);
    const database = connection.db(dbName);
    const notesCol = database.collection(colName);
    await notesCol.updateOne({_id: id}, {$set: {title: req.body.title, text: req.body.text}}, {upsert: false});
    console.log('Note was updated: Ok');
    connection.close();
    res.send('Note was updated!');
  });
}   
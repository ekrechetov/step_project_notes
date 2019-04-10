const {uri, dbName, colName} = require('../db/config.js');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

module.exports = (app) => {
  app.put('/lists/:id', async function (req, res) {
    let connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    console.log('Connected for update: Ok');
    const id = new ObjectID(req.body.id);
    const database = connection.db(dbName);
    const notesCol = database.collection(colName);
    console.log(req.body);
    await notesCol.updateOne({_id: id}, {$set: {title: req.body.title, content: req.body.content}}, {upsert: false});
    console.log('List was updated: Ok');
    connection.close();
    res.send('List was updated!');
  });
}   
const {uri, dbName, colName} = require('../db/config.js');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

module.exports = (app) => {
  app.post("/notes", async function (req, res) {       
    if(!req.body) return res.sendStatus(400);
    let connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    console.log('connected for add successfully!');
    const database = connection.db(dbName);
    const notesCol = database.collection(colName);
    const addedNote = await notesCol.insertOne(note);
    connection.close();
    res.redirect("/");
  });
}
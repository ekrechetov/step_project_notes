const {uri, dbName, colName} = require('../db/config.js');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

module.exports = (app) => {
  app.get("/notes", (req, res) => {
  res.render("create-note.pug");
  });
  app.post("/notes", async function (req, res) {       
    if(!req.body) return res.sendStatus(400);
    const note = {
      title: req.body.title,
      text: req.body.text
    };
    let connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    console.log('connected for add successfully!');
    const database = connection.db(dbName);
    const notesCol = database.collection(colName);
    const addedNote = await notesCol.insertOne(note);
    connection.close();
    res.redirect("/");
  });
}
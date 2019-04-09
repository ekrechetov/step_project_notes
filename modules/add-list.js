const {uri, dbName, colName} = require('../db/config.js');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

module.exports = (app) => {
  app.get("/lists", (req, res) => {
  res.render("create-list.pug", {note: {}});
  });
  app.post("/lists", async function (req, res) {       
    if(!req.body) return res.sendStatus(400);
    const note = {
      type: req.body.type, 
      title: req.body.title,
      content: req.body.content
    };
    let connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    console.log('Connected for add: Ok');
    const database = connection.db(dbName);
    const notesCol = database.collection(colName);
    const addedNote = await notesCol.insertOne(note);
    connection.close();
    console.log('Note was added: Yes');
    res.redirect("/");
  });
}
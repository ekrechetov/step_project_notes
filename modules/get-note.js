const {uri, dbName, colName} = require('../db/config.js');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

module.exports = (app) => {
  app.get('/notes/:id', async function (req, res) {
    let connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    const id = new ObjectID(req.params.id);
    const notesDb = connection.db(dbName);
    const notesCol = notesDb.collection(colName);
    const note = await notesCol.findOne({_id: id});

    connection.close();
   
    res.render('edit-note.pug', {title: 'Notes', note: note});    
  });
}
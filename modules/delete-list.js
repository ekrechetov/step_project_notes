const {uri, dbName, colName} = require('../db/config.js');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

module.exports = (app) => {
  app.delete("/lists/:id", async function(req, res) {
    let connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    console.log('Connected for delete: Ok');    
    const id = new ObjectID(req.params.id);
    const database = connection.db(dbName);
    const notesCol = database.collection(colName);
    await notesCol.deleteOne({_id: id}, function(err, result) {             
      if(err) return console.log(err);
      connection.close();
      console.log('List was deleted: Yes');
      res.send('List was deleted!');
    });
  });
}   
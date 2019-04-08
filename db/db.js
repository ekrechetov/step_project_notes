const {uri, dbName, colName} = require('./config');
const MongoClient = require('mongodb').MongoClient;
//Function for check connection:
exports.checkConnection = async () => {
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
//Function for get notes from database:
exports.getNotes = async () => {
  let client = await MongoClient.connect(uri, {useNewUrlParser: true});
  const notesDb = client.db(dbName);
  const notesCol = notesDb.collection(colName);
  const notes = await notesCol.find({}).toArray();
  client.close();
  return notes;
};
//Function for add note to database:
exports.addNote = async (note) => {
  let client = await MongoClient.connect(uri, {useNewUrlParser: true});
  console.log('connected for add successfully!');
  const database = client.db(dbName);
  const notesCol = database.collection(colName);
  const addedNote = await notesCol.insertOne(note);
  client.close();
  return addedNote;
};
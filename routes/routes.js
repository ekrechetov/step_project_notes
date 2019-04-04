const checkConnection = require('../modules/check-connection.js');
const getNotes = require('../modules/get-notes.js');
const addNote = require('../modules/add-note.js');
const getNote = require('../modules/get-note.js');
// const updateNote = require('../app/modules/notes/update/updateNote');
// const deleteNote = require('../app/modules/notes/delete/deleteNote');
// const addList = require('../app/modules/list/addList');

module.exports = (app) => {
  checkConnection(app);////arguments to remove!
  getNotes(app);
  addNote(app);
  getNote(app);
  //   updateNote(app, db);
  //   deleteNote(app, db);
	//   addList(app, db);
}